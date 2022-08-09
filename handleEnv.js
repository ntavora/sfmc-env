<script runat="server" language="JavaScript">
  Platform.Load("core", "1.1.1");
  try{
    function Enviroment(enviroment) { 
      // init
      var envVars = _init(enviroment);
      var service = {
        env: envVars
      };
            
      return service;
      function _init(enviroment) {
        var env_vars = {};
        var deName= "Enviroment"
        var filtro = {
          Property: "Name",
          SimpleOperator: "equals",
          Value: deName 
        }
        deEnv = DataExtension.Retrieve(filtro);
        if(deEnv.length == 0){
          DataExtension.Add({
            "CustomerKey": Platform.Function.GUID(),
            "Name": deName,
            "Fields": [
                {
                "Name": "Env",
                "FieldType": "Text",
                "MaxLength": 100,
                "IsRequired": false
                }
                ,{
                    "Name": "Key",
                    "FieldType": "Text",
                    "MaxLength": 200,
                    "IsRequired": false
                }
                ,{
                    "Name": "Value",
                    "FieldType": "Text",
                    "MaxLength": 4000,
                    "IsRequired": false
                }
            ]
          });
        }
        var prox = new Script.Util.WSProxy();         
        var data = prox.retrieve("DataExtensionObject[" +deName + "]",["Key", "Value"],{
          Property: "Env",
          SimpleOperator: "equals",
          Value: enviroment
        });
        var results =  data.Results;
        for(var i = 0; i< results.length; i++){
          var properties = results[i].Properties;
          var key = properties[0].Value;
          var value = properties[1].Value;
          env_vars[key]=value;
        }        
        return env_vars;
      }
     
    }
  //  var process = Enviroment('Prod');
   // Write(process.env.campaing);
  }
  catch(ex){
    Write(Stringify(ex));
  }
</script>