# Handle ENV vars on SFMC

## INSTALL 

On cloud Pages Include this snippet %%=TreatAsContent(HTTPGet('https://raw.githubusercontent.com/devsutd/sfmc/main/handleEnv.js'))=%% 

After you include the snippet you should Initialize an instace of the Enviroment object with the env and the project Name.

<!-- SFMC LOGGER V 1.0 -->
%%=TreatAsContent(HTTPGet('https://raw.githubusercontent.com/devsutd/sfmc/main/handleEnv.js'))=%%
<script runat="server">  
  try{
    var process = Enviroment('Dev',"Project1");
   
  }
  catch(ex){
    Write(Stringify(ex))
  }
</script>

After the initialization, you should publish and open the page.


Go to dataextensions > Project1 > Project1_Enviroment and load the Enviroment variables that you need.

For access to the env vars you should do something like this:  process.env.varName

