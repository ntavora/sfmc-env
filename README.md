# Handle ENV vars on SFMC

## INSTALL 

On cloud Pages Include this snippet
   >%%=TreatAsContent(HTTPGet('https://raw.githubusercontent.com/devsutd/sfmc/main/handleEnv.js'))=%% 

After you include the snippet you should Initialize an instace of the Enviroment object with the env and the project Name.
```<!-- SFMC LOGGER V 1.0 --> <br>
%%=TreatAsContent(HTTPGet('https://raw.githubusercontent.com/devsutd/sfmc/main/handleEnv.js'))=%% 
<script runat="server">  
  try{
    var process = Enviroment('Dev',"Project1");
   
  }<br>
  catch(ex){
    Write(Stringify(ex))
  }
</script>
```


After the initialization, you should publish and open the page.


Go to dataextensions > Project1 > Project1_Enviroment and load the Enviroment variables that you need.

### How to access to the variables?

Use the process.env.varname. Example

>  Write(process.env.campaing)

