import { createClient } from '@supabase/supabase-js'
import { PokedexEntryEntity } from './pokedexEntryEntity'


export default class DBResource{

     supabaseUrl = 'https://wvbhoxbxpwxmvprlcxno.supabase.co'
     SERVICE_KEY = 'SUPABASE_SERVICE_KEY'
     supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2YmhveGJ4cHd4bXZwcmxjeG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA3MTM1MDMsImV4cCI6MjAwNjI4OTUwM30.GFaiNe-24OBUZ-J-qNepju6I28QYBszwFHYkh4igt5k'
 
     
     supabase = createClient(this.supabaseUrl, this.supabaseKey);

     async signInWithTwitch() {
        const { data, error } = await this.supabase.auth.signInWithOAuth({
          provider: 'twitch',
          options: {
            redirectTo: "https://testpokedex.onrender.com/",
            },
        })
      }


      async signOutWithTwitch() {
        const { } = await this.supabase.auth.signOut();
        window.location.reload();
      }

      async updateSettings(settings, notFindableTrade,notFindablePokemonSearch,trainerImage, hidedex,pokedexfav1,pokedexfav2,pokedexfav3,pokedexfav4,pokedexfav5){

        const { data, error } = await this.supabase
        .from('UserSetting')
        .update({ id: settings.id, username: settings.username, userid:settings.userid + '', notFindableTrade: notFindableTrade, twitchid: settings.twitchid, notfindablepokemonsearch:notFindablePokemonSearch, trainerimage:trainerImage, hidedex:hidedex ,pokedexextrafav1:pokedexfav1,pokedexextrafav2:pokedexfav2,pokedexextrafav3:pokedexfav3,pokedexextrafav4:pokedexfav4,pokedexextrafav5:pokedexfav5})
        .eq('id',  settings.id);

        if(!!error){
            return null;
        }
        return await this.getSettings();
      }

      async saveSettings(notFindableTrade,notFindablePokemonSearch,trainerImage,hidedex,pokedexfav1,pokedexfav2,pokedexfav3,pokedexfav4,pokedexfav5){
        const { data: { user } } = await this.supabase.auth.getUser();

        console.log("providerid: " + user?.user_metadata.provider_id);
        const { data, error } = await this.supabase
        .from('UserSetting')
        .insert(
            {username: user?.user_metadata.full_name, userid: user?.id + '', notFindableTrade: notFindableTrade, twitchid:user?.user_metadata.sub, notfindablepokemonsearch:notFindablePokemonSearch, trainerimage:trainerImage, hidedex:hidedex,pokedexextrafav1:pokedexfav1,pokedexextrafav2:pokedexfav2,pokedexextrafav3:pokedexfav3,pokedexextrafav4:pokedexfav4,pokedexextrafav5:pokedexfav5}
        )
        if(!!error){
            return null;
        }
        return await this.getSettings();
      }


      async updatePokemonSettings(settings, wanttrade){

        const { data, error } = await this.supabase
        .from('PokemonUserSetting')
        .update({ id: settings.id, username: settings.username, userid:settings.userid + '', wanttrade: wanttrade, pokedex:settings.pokedex, twitchid: settings.twitchid})
        .eq('id',  settings.id);

        if(!!error){
            return null;
        }
        return await this.getPokemonSetting(settings.pokedex);
      }

      async savePokemonSettings(pokedex,wanttrade){

        const { data: { user } } = await this.supabase.auth.getUser();

        console.log("providerid: " + user?.user_metadata.provider_id);
        const { data, error } = await this.supabase
        .from('PokemonUserSetting')
        .insert(
            {username: user?.user_metadata.full_name, userid: user?.id + '', wanttrade: wanttrade, pokedex:pokedex, twitchid:user?.user_metadata.sub}
        )
  
        if(!!error){
            return null;
        }
        return await this.getPokemonSetting(pokedex);
      }

      
      async getPokemonSettings(){
        
        const { data: { user } } = await this.supabase.auth.getUser();
        if(user){
        let { data: settings, error } = await this.supabase
            .from('PokemonUserSetting')
            .select("*")
            // Filters
            .eq('userid',  user?.id);
            return settings;
        }
      }

      async getPokemonLock(username){
    
        let { data: settings, error } = await this.supabase
            .from('LockedMons')
            .select("*")
            // Filters
            .eq('username',  username);
            return settings;
      }

      
      async getPokemonSettingsForUser(username){
        let { data: settings, error } = await this.supabase
            .from('PokemonUserSetting')
            .select("*")
            // Filters
            .eq('username',  username);
            return settings;
        
      }

      async getPokemonSetting(pokedex){
        
        const { data: { user } } = await this.supabase.auth.getUser();
        if(user){
        let { data: settings, error } = await this.supabase
            .from('PokemonUserSetting')
            .select("*")
            // Filters
            .eq('userid',  user?.id)
            .eq('pokedex',pokedex);
            return settings;
        }
      }

      async getSettings(){
        
        const { data: { user } } = await this.supabase.auth.getUser();
        if(user){
        let { data: settings, error } = await this.supabase
            .from('UserSetting')
            .select("*")
            // Filters
            .eq('userid',  user?.id);
            return settings;
        }
      }

      
      async getSettingsForUser(username){
        

        let { data: settings, error } = await this.supabase
            .from('UserSetting')
            .select("*")
            // Filters
            .eq('username',  username);
            return settings;
        
      }


      async insertRow(){
        const { data, error } = await this.supabase
            .from('test2')
            .insert([
                { valueee: 'valueee' },
            ])
            .select()
      }

      
     async getUser() {
        const { data: { user } } = await this.supabase.auth.getUser();
        console.log(user);
            return user;
    }


    async sendRequest(username) {
        console.log('calling');
   

        let { data: AllPokemonDatabase, error } = await this.supabase
            .from('AllPokemonDatabase')
            .select("*")
            // Filters
            .eq('currentOwner', username);

      

        return  AllPokemonDatabase;
    }

    async getUniqueUsers() {
        console.log('calling');
   

        let { data: distinctusers, error } = await this.supabase
            .from('distinctusers')
            .select("*");

        
     
        let options = distinctusers.map(user=> {return {value:user.originalOwner, label:user.originalOwner}}) ; 
        return  options;
    }

    async getUniqueUsersPokedex() {
        console.log('calling');
   

        let { data: distinctusers, error } = await this.supabase
            .from('distinctuserspokedex')
            .select("*");

        
     
        let options = distinctusers.map(user=> {return {value:user.originalOwner, label:user.originalOwner}}) ; 
        return  options;
    }


    
    async getUniqueUsersPokedexCompare() {
        console.log('calling');
   

        let { data: distinctusers, error } = await this.supabase
            .from('distinctuserspokedexcompare')
            .select("*");

        
     
        let options = distinctusers.map(user=> {return {value:user.originalOwner, label:user.originalOwner}}) ; 
        return  options;
    }


    
    async getPokedex() {
        let { data, error } = await this.supabase
        .from('PokemonData')
        .select("*");

        let options = data.map(pokemon=> {return {value:pokemon.gamePokedex, label:pokemon.monName}}) ; 
        return  options;
    }

    async getUsersWhoOwnPokemon(pokedex) {
        let { data: AllUserData, error:error2} = await this.supabase
        .from('pokemonCaugthCounterWithSettings')
        .select("*")
        // Filters
        .eq('pokedex', pokedex);



        AllUserData.sort(function (a, b) {
            if (a.count > b.count) {
              return -1;
            }
            if (a.count < b.count) {
              return 1;
            }
            return 0;
          });
          return AllUserData;


    }

    async getUsersWhoOwnShinyPokemon(pokedex) {
        let { data: AllUserData, error:error2} = await this.supabase
        .from('shinyPokemonCaugthCounterWithSettings')
        .select("*")
        // Filters
        .eq('pokedex', pokedex);



        AllUserData.sort(function (a, b) {
            if (a.count > b.count) {
              return -1;
            }
            if (a.count < b.count) {
              return 1;
            }
            return 0;
          });
          return AllUserData;


    }

    async getTotalPokemonOverview() {
        console.log('calling totalPokemonOverview');


        let { data, error } = await this.supabase
            .from('totalpokemonoverview')
            .select("*");

        let allData: PokedexEntryEntity[] = data;
        allData.forEach(entry => {
            if(entry.rarity == 'Common'){
                entry.rarityNumber= 1;
            } else  if(entry.rarity == 'Uncommon'){
                entry.rarityNumber= 2;
            } else  if(entry.rarity == 'Rare'){
                entry.rarityNumber= 3;
            } else  if(entry.rarity == 'Legendary'){
                entry.rarityNumber= 4;
            } else  if(entry.rarity == 'Unattainable'){
                entry.rarityNumber= 5;
            }

            if(!entry.normalCount){
                entry.normalNumber=0;
            }else {
                entry.normalNumber=entry.normalCount;
            }

            if(!entry.shinyCount){
                entry.shinyNumber=0;
            }else{
                entry.shinyNumber=entry.shinyCount;
            }
            entry.key = entry.pokedex;
            let parts = entry.pokedex.match(/[a-zA-Z]+|[0-9]+/g)
            while (parts[0].length < 6) parts[0] = "0" + parts[0];
            entry.pokedex=parts[0] + (parts[1]==undefined?"":parts[1]);
        });


        allData.sort(function (a, b) {
            if (a.pokedex < b.pokedex) {
              return -1;
            }
            if (a.pokedex > b.pokedex) {
              return 1;
            }
            return 0;
          });



        allData.forEach(entry => {
            entry.pokedex =   entry.pokedex.replace(/^0+/, '');
        });

       return  allData?.filter(test=>{ return !(test.rarityNumber == 5)});
    }

    async getAllForTable(tableName){
        console.log('calling data for' + tableName);
        let { data, error } = await this.supabase
        .from(tableName)
        .select("*");

        return  data;
    }



    


    async getUniquePokedexEntries(username) {
        console.log('calling pokedex');


        let { data, error } = await this.supabase
            .from('ownedpokemondex')
            .select("*");

        let allData: PokedexEntryEntity[] = data;
        allData.forEach(entry => {
            entry.normalNumber =0;
            entry.shinyNumber =0;
            if(entry.rarity == 'Common'){
                entry.rarityNumber= 1;
            } else  if(entry.rarity == 'Uncommon'){
                entry.rarityNumber= 2;
            } else  if(entry.rarity == 'Rare'){
                entry.rarityNumber= 3;
            } else  if(entry.rarity == 'Legendary'){
                entry.rarityNumber= 4;
            } else if(entry.rarity == 'Unattainable'){
                entry.rarityNumber= 5;
            }
       
         
            entry.key = entry.pokedex;
            let parts = entry.pokedex.match(/[a-zA-Z]+|[0-9]+/g)
            while (parts[0].length < 6) parts[0] = "0" + parts[0];
            entry.pokedex=parts[0] + (parts[1]==undefined?"":parts[1]);
        });

        debugger;
        allData.sort(function (a, b) {
            if (a.pokedex < b.pokedex) {
              return -1;
            }
            if (a.pokedex > b.pokedex) {
              return 1;
            }
            return 0;
          });



        allData.forEach(entry => {
            entry.pokedex =   entry.pokedex.replace(/^0+/, '');
        });


        let { data: AllPokemonDatabase, error:error2} = await this.supabase
        .from('AllPokemonDatabase')
        .select("*")
        // Filters
        .eq('currentOwner', username);
     

        AllPokemonDatabase.forEach(entry=> {
            let notFound = true;
            let startIndex = 0;
            while(notFound){
                if(allData[startIndex].pokedex == entry.pokedex){
                    if(entry.shiny){
                        allData[startIndex].shinyNumber = allData[startIndex].shinyNumber+1;
                    }else{
                        allData[startIndex].normalNumber = allData[startIndex].normalNumber+1;
                    }
                   
                    notFound=false;
                }
                startIndex++;
            }

        });

        


       return  allData?.filter(test=>{ return !(test.rarityNumber == 5 && test.shinyNumber == 0 && test.normalNumber == 0  )});
    }


    
    async getBadges(username) {
        console.log('calling');
   

        let { data: badgesData, error } = await this.supabase
            .from('siteBadgeView')
            .select("*")
            // Filters
            .eq('username', username);

      

        return  badgesData;
    }
  
}

