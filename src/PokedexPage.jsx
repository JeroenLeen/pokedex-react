import React, {useContext, useState, useEffect} from 'react';

import './PokedexPage.css'
import singletondDbResource from './DBResourceSingleton'
import PokedexEntry from './subcomponents/PokedexEntry'
import Select from 'react-select'
import 'react-tooltip/dist/react-tooltip.css'
import {Tooltip} from 'react-tooltip'
import {useNavigate} from "react-router-dom";


import {UserContext} from './GeneralComponent';
import {UserLoadedContext} from './GeneralComponent';
import {FaBalanceScale, FaBeer, FaSearch, FaLock} from "react-icons/fa";


export default function PokedexPage() {
    //static contextType = ThemeContext;


    const resource = singletondDbResource;
    const queryParameters = new URLSearchParams(window.location.search)
    const userParam = queryParameters.get("user")?.toLowerCase();

    //const items2 = useRef([]);

    const [items2, setItems2] = useState([]);
    const [pokemonsOriginalSort, setPokemonsOriginalSort] = useState([]);
    const [users, setUsers] = useState([]);
    const [usersCalled, setUsersCalled] = useState(false);
    const [userValue, setUserValue] = useState();
    const [hasData, setHasData] = useState(true);
    const [pokemonCaugth, setPokemonCaugth] = useState(0);
    const [uniquePokemonCaugth, setUniquePokemonCaugth] = useState(0);
    const [totalShinyCaugth, setTotalShinyCaugth] = useState(0);
    const [disableSort2, setDisableSort2] = useState(true);
    const [mydex, setMydex] = useState(false);
    const sortOptions = [{value: "Pokedex", label: "Pokedex"},
        {value: "Name", label: "Name"}, {value: "Number caught ↑", label: "Number caught ↑"}, {
            value: "Number caught ↓",
            label: "Number caught ↓"
        }
        , {value: "Shiny's caught ↑", label: "Shiny's caught ↑"}, {value: "Shiny's caught ↓", label: "Shiny's caught ↓"}
        , {value: "Rarity ↑", label: "Rarity ↑"}, {value: "Rarity ↓", label: "Rarity ↓"}, {
            value: "Seasonal",
            label: "Seasonal"
        }]
    const [selectValue, setSelectValue] = useState({value: "Pokedex", label: "Pokedex"});
    const [selectValue2, setSelectValue2] = useState({value: "Pokedex", label: "Pokedex"});
    const {logedInUser, setLogedInUser} = useContext(UserContext);
    const {userLoaded, setUserLoaded0} = useContext(UserLoadedContext);
    const [trainerImage, setTrainerImage] = useState();
    const [badBoy, setBadBoy] = useState(false);
    const [legend, setLegend] = useState(false);
    const [badgeData, setBadgeData] = useState({});

    useEffect(() => {
        (async () => {
            if (!usersCalled && userLoaded) {
                setUsersCalled(true);
                console.log("calling unique users:");
                const foundUsers = await resource.getUniqueUsersPokedex();
                foundUsers.push({value: "overview", label: "overview"});
                setUsers(foundUsers);
                if (userParam) {
                    if (!foundUsers.find(s => s.label == userParam)) {
                        setBadBoy(true);
                    } else {
                        const data = await resource.getSettingsForUser(userParam);
                        if (data.length == 1 && data[0].trainerimage) {
                            setTrainerImage("trainers/bulk/" + data[0]?.trainerimage);
                        } else {
                            setTrainerImage(undefined);
                        }
                        setUserValue({label: userParam, value: userParam});
                        await fetchAndDisplayPokemonData(userParam);
                    }

                } else {
                    setUserValue({label: "overview", value: "overview"});
                    await fetchAndDisplayPokemonData("overview");
                }

            }
        })();
    }, [userLoaded]);

    const setNewValue = (pokedex, value) => {
        items2.forEach(i => {
            if (i.pokedex === pokedex) {
                i.setting = value;
            }
        });
        setItems2([...items2]);
    }

    const onChangeHandler = (change) => {

        setUserValue(change);
        setBadBoy(false);
        setSelectValue({value: "Pokedex", label: "Pokedex"});
        (async () => {

            console.log("finding pokemon for:" + change.value);
            const data = await resource.getSettingsForUser(change.value);

            if (data.length == 1 && data[0].trainerimage) {
                setTrainerImage("trainers/bulk/" + data[0]?.trainerimage);
            } else {
                setTrainerImage(undefined);
            }

            await fetchAndDisplayPokemonData(change.value);

        })()
    };

    async function fetchAndDisplayPokemonData(value) {
        window.history.pushState({path: '?user=' + value}, '', '?user=' + value);
        setHasData(false);
        let settingdata = [];
        let lockdata = [];
        let badgesData;
        if (logedInUser === value) {
            settingdata = await resource.getPokemonSettings();
        }
        lockdata = await resource.getPokemonLock(value);
        badgesData = await resource.getBadges(value);
        if (badgesData.length > 0) {
            setBadgeData(badgesData[0]);
        }else {
            setBadgeData({});
        }
        let data
        if (value == "overview") {
            data = await resource.getTotalPokemonOverview();
        } else {
            data = await resource.getUniquePokedexEntries(value);
        }

        let shinySum = 0;
        let totalSum = 0;
        // calculate sum using forEach() method
        data.forEach(entry => {
            shinySum += entry.shinyNumber;
            totalSum += entry.normalNumber + entry.shinyNumber;
            if (logedInUser === value) {
                entry.setting = settingdata.find((set) => set.pokedex == entry.pokedex);
            }
            entry.lock = lockdata.find((set) => set.dex == entry.pokedex);
        });
        setPokemonCaugth(totalSum);
        setTotalShinyCaugth(shinySum);
        setUniquePokemonCaugth(data.filter((entry) => (entry.normalNumber > 0 | entry.shinyNumber > 0) && !entry.isSeasonal).length);
        setItems2(data);
        setMydex(userValue?.value === logedInUser);
        setPokemonsOriginalSort(data);
    }

    function sortByFieldAscPrimary(data, primaryField, secondaryField) {

        data.sort(function (a, b) {
            if (a[primaryField] < b[primaryField]) {
                return -1;
            }
            if (a[primaryField] > b[primaryField]) {
                return 1;
            }
            return secondarySort(a, b, secondaryField);
        });

    }


    function sortByFieldDescPrimary(data, primaryField, secondaryField) {
        data.sort(function (a, b) {
            if (a[primaryField] > b[primaryField]) {
                return -1;
            }
            if (a[primaryField] < b[primaryField]) {
                return 1;
            }
            return secondarySort(a, b, secondaryField);
        });
    }

    function sortByFieldAsc(a, b, field) {
        if (a[field] < b[field]) {
            return -1;
        }
        if (a[field] > b[field]) {
            return 1;
        }
        return 0;
    }

    function sortByFieldDesc(a, b, field) {
        if (a[field] > b[field]) {
            return -1;
        }
        if (a[field] < b[field]) {
            return 1;
        }
        return 0;
    }

    function getSortableDex(dex) {
        let parts = dex.match(/[a-zA-Z]+|[0-9]+/g)
        while (parts[0].length < 6) parts[0] = "0" + parts[0];
        return parts[0] + (parts[1] == undefined ? "" : parts[1]);
    }


    function sortByPokedexdAsc(a, b) {

        let compa = getSortableDex(a.pokedex);
        let compb = getSortableDex(b.pokedex);

        if (compa < compb) {
            return -1;
        }
        if (compa > compb) {
            return 1;
        }
        return 0;
    }


    const secondarySort = (a, b, secondaryFilter) => {

        if (secondaryFilter == "Pokedex") {
            return sortByPokedexdAsc(a, b);
        }

        if (secondaryFilter == "Name") {
            return sortByFieldAsc(a, b, "monName");
        }

        if (secondaryFilter == "Number caught ↑") {
            return sortByFieldAsc(a, b, "normalNumber");
        }

        if (secondaryFilter == "Number caught ↓") {
            return sortByFieldDesc(a, b, "normalNumber");
        }

        if (secondaryFilter == "Shiny's caught ↑") {
            return sortByFieldAsc(a, b, "shinyNumber");
        }

        if (secondaryFilter == "Shiny's caught ↓") {
            return sortByFieldDesc(a, b, "shinyNumber");
        }

        if (secondaryFilter == "Rarity ↑") {
            return sortByFieldAsc(a, b, "rarityNumber");
        }

        if (secondaryFilter == "Rarity ↓") {
            return sortByFieldDesc(a, b, "rarityNumber");
        }

        if (secondaryFilter == "Seasonal") {
            return sortByFieldDesc(a, b, "isSeasonal");
        }


    };

    const onSortChangeHandler = (change) => {

        setSelectValue(change);
        let tempData = pokemonsOriginalSort.map(a => {
            return {...a}
        });

        if (change.value == "Pokedex") {
            setDisableSort2(true);
        }

        if (change.value == "Name") {
            sortByFieldAscPrimary(tempData, "monName", selectValue2.value);
            setDisableSort2(true);
        }

        if (change.value == "Number caught ↑") {
            sortByFieldAscPrimary(tempData, "normalNumber", selectValue2.value);
            setDisableSort2(false);
        }

        if (change.value == "Number caught ↓") {
            sortByFieldDescPrimary(tempData, "normalNumber", selectValue2.value);
            setDisableSort2(false);
        }

        if (change.value == "Shiny's caught ↑") {
            sortByFieldAscPrimary(tempData, "shinyNumber", selectValue2.value);
            setDisableSort2(false);
        }

        if (change.value == "Shiny's caught ↓") {
            sortByFieldDescPrimary(tempData, "shinyNumber", selectValue2.value);
            setDisableSort2(false);
        }

        if (change.value == "Rarity ↑") {
            sortByFieldAscPrimary(tempData, "rarityNumber", selectValue2.value);
            setDisableSort2(false);
        }

        if (change.value == "Rarity ↓") {
            sortByFieldDescPrimary(tempData, "rarityNumber", selectValue2.value);
            setDisableSort2(false);
        }

        if (change.value == "Seasonal") {
            sortByFieldDescPrimary(tempData, "isSeasonal", selectValue2.value);
            setDisableSort2(false);
        }

        setItems2(tempData);
    };


    const onSortChangeHandler2 = (change) => {

        setSelectValue2(change);
        let tempData = pokemonsOriginalSort.map(a => {
            return {...a}
        });
        if (selectValue.value == "Name") {
            sortByFieldAscPrimary(tempData, "monName", change.value);
        }


        if (selectValue.value == "Number caught ↑") {
            sortByFieldAscPrimary(tempData, "normalNumber", change.value);
        }

        if (selectValue.value == "Number caught ↓") {
            sortByFieldDescPrimary(tempData, "normalNumber", change.value);
        }

        if (selectValue.value == "Shiny's caught ↑") {
            sortByFieldAscPrimary(tempData, "shinyNumber", change.value);
        }

        if (selectValue.value == "Shiny's caught ↓") {
            sortByFieldDescPrimary(tempData, "shinyNumber", change.value);
        }

        if (selectValue.value == "Rarity ↑") {
            sortByFieldAscPrimary(tempData, "rarityNumber", change.value);
        }

        if (selectValue.value == "Rarity ↓") {
            sortByFieldDescPrimary(tempData, "rarityNumber", change.value);
        }

        if (selectValue.value == "Seasonal") {
            sortByFieldDescPrimary(tempData, "isSeasonal", change.value);
        }


        setItems2(tempData);
    };

    const toggleLegend = () => {
        setLegend(!legend);
    }

    return (
        <div className="wholeSite">
            <div className="content">


                <div className="header">
                    <img src='/streamingfalcon.png' alt="Image" className="logo"/><h1 className='titleText'>Hatch &
                    Catch Pokedex</h1><img src="yogieisbar.png" alt="Image" className="logo"/>
                </div>
                <div className='selectorWrapper'>
                    {trainerImage ? <img className='trainerImage' src={trainerImage}></img> : ''}
                    <div className='selector'>
                        <h4 className='selectTitle'>
                            User:
                        </h4>
                        <div className='selectAndTooltip'>
                            <Select className='selectorSelect' value={userValue} options={users}
                                    onChange={onChangeHandler} defaultValue={"User"}></Select>
                            <div className="selectIcon">
                                <img data-tooltip-id="my-tooltip" className='selectIconImg'
                                     src="/unown-question.png"></img>
                                <Tooltip id="my-tooltip"
                                         place="top"
                                         effect='solid'
                                         content="The user whose pokedex you want to see. You can search in this field"/>
                            </div>
                        </div>
                    </div>
                    {trainerImage ? <img className='trainerImage' src={trainerImage}></img> : ''}
                </div>

                <div>
                    <div className='generalData'>
                        <div><h4>Total Catches: {pokemonCaugth}</h4></div>
                        <div><h4> Unique Catches: {uniquePokemonCaugth}</h4></div>
                        <div><h4> Total Shiny's Caught: {totalShinyCaugth}</h4></div>
                    </div>

                </div>
                <div className='badgearea'>

                    <div className='badgeContainer'>
                        <div className='badgeTitle'>Collections</div>
                        <div className='badgeList'>
                            <img className='badge' data-tooltip-id="falcon-badge-tooltip"
                                 src={badgeData?.FalconToken ? '/falconraffle.png' : '/emptyTicket.png'}></img>
                            <Tooltip id="falcon-badge-tooltip"
                                     place="left"
                                     effect='solid'
                                     content="Entry ticket for falcon end of month raffle, 1 pack redeem required to earn this"/>
                            <img className='badge' data-tooltip-id="yogi-badge-tooltip"
                                 src={badgeData?.YogiToken ? '/yogiraffle.png' : '/emptyTicket.png'}></img>
                            <Tooltip id="yogi-badge-tooltip"
                                     place="left"
                                     effect='solid'
                                     content={"Entry ticket for yogi end of month raffle, " + badgeData?.yogiTokenGoal  + " break joins required to earn this, you have joined: " + badgeData?.wheelTotals}/>
                            <img className='badge' data-tooltip-id="trade-badge-tooltip"
                                 src={badgeData?.tradesBadge ? '/tradebadge.png' : '/emptytradebadge.png'}></img>
                            <Tooltip id="trade-badge-tooltip"
                                     place="left"
                                     effect='solid'
                                     content={"More than " + badgeData?.tradesGoal +  " trades made, you have " + badgeData?.tradesCompleted }/>
                            <img className='badge' data-tooltip-id="gift-badge-tooltip"
                                 src={badgeData?.giftsBadge ? '/giftbadge.png' : '/emptygiftbadge.png'}></img>
                            <Tooltip id="gift-badge-tooltip"
                                     place="left"
                                     effect='solid'
                                     content={"More than " +badgeData?.giftsGoal +" gifts given, you have " + badgeData?.giftsGiven }/>
                            <img className='badge' data-tooltip-id="newgameplus-badge-tooltip"
                                 src={badgeData?.newGamePlusBadge ? '/newgameplus.png' : '/emptynewgameplus.png'}></img>
                            <Tooltip id="newgameplus-badge-tooltip"
                                     place="left"
                                     effect='solid'
                                     content="You did new game plus"/>
                            <img className='badge' data-tooltip-id="duel-badge-tooltip"
                                 src={badgeData?.DuelBadge ? '/duelbadge.png' : '/emptyduelbadge.png'}></img></div>
                        <Tooltip id="duel-badge-tooltip"
                                 place="left"
                                 effect='solid'
                                 content={ badgeData?.duelsGoal + " duels won, you have " + badgeData?.duelsWon}/>
                    </div>
                </div>
                <button className={legend ? 'legendButton active' : 'legendButton'} onClick={toggleLegend}>Legend
                </button>
                <div className={legend ? 'legend' : 'hide'}>
                    <div><img className='explain-logo' src='/Common.png'></img> = Common</div>
                    <div><img className='explain-logo' src='/Uncommon.png'></img> = Uncommon</div>
                    <div><img className='explain-logo' src='/Rare.png'></img> = Rare</div>
                    <div><img className='explain-logo' src='/Legendary.png'></img> = Legendary</div>
                    <div><img className='explain-logo' src='/yogieisbar.png'></img> = YogiEisbar exclusive</div>
                    <div><img className='explain-logo' src='/streamingfalcon.png'></img> = StreamingFalcon exclusive
                    </div>
                    <div><FaSearch className='explain-logo'/> = Find pokemon</div>
                    <div><FaBalanceScale className='explain-logo'/> = Login only. Your own dex only. Mark as 'wanted for
                        trade'
                    </div>
                    <div><FaLock className='explain-logo fillGreen'/> Locked pokemon, can't be gifted</div>
                </div>
                <div className='sortContainer'>
                    <div className='sortSelectContainer'><h4 className='selectTitle'>Primary sort:</h4> <Select
                        isDisabled={hasData} className='sortSelect' options={sortOptions} onChange={onSortChangeHandler}
                        value={selectValue}></Select>
                    </div>
                    <div className='sortSelectContainer'><h4 className='selectTitle'>Secondary sort:</h4> <Select
                        isDisabled={hasData || disableSort2} className='sortSelect' options={sortOptions}
                        onChange={onSortChangeHandler2} value={selectValue2}></Select>
                    </div>
                </div>
                <div>
                    {badBoy ? <img src="nono.gif"></img> : ""}
                </div>
                <div className='entries'>
                    {

                        items2.map(function (el, index) {

                            return <div key={el.key} className={"entryBorder" + index % 4 + " entry"}>
                                <PokedexEntry key={el.pokedex} pokedexEntryNumber={el.pokedex}
                                              normalNumber={el.normalNumber} shinyNumber={el.shinyNumber}
                                              name={el.monName} type1={el.type1} type2={el.type2}
                                              exclusiveTo={el.exclusiveTo} setting={el.setting} lock={el.lock}
                                              rarity={el.rarity} valuechange={setNewValue}
                                              mydex={userValue.value === logedInUser} selectedUser={userValue.value}
                                              noShine={userValue.value === "overview"}></PokedexEntry>

                            </div>
                        })
                    }
                </div>
                <div className="footer">

                    <div className="selectIcon">
                        <img data-tooltip-id="info-tooltip" className='selectIconImg' src="/unown-question.png"></img>
                        <Tooltip id="info-tooltip"
                                 place="left"
                                 effect='solid'
                                 content="For bugs, please contact Forodor on discord"/>
                    </div>

                </div>

            </div>

        </div>
    )


}


