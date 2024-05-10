    function Enviroment(enviroment,proyectName) {
      // init
      var envVars = _init(enviroment,proyectName);
      var service = {
        env: envVars
      };
      return service;
      function _init(enviroment,proyectName) {
        var env_vars = {
        };
        var deName   = proyectName+"_Enviroment"
        var filtro   = {
          Property: "Name",
          SimpleOperator: "equals",
          Value: deName 
        }
        deEnv = DataExtension.Retrieve(filtro);
        if(deEnv.length == 0){
          var folder = getFolderByName(proyectName);
          if(folder.length == 0){
            folder = createFolder(proyectName);
          }
          DataExtension.Add({
            "CustomerKey": Platform.Function.GUID(),
            "Name": deName,
            "CategoryID":folder[0].ID,
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
          }
                           );
        }
        var prox = new Script.Util.WSProxy();
        var data = prox.retrieve("DataExtensionObject[" +deName + "]",["Key", "Value"],{
          Property: "Env",
          SimpleOperator: "equals",
          Value: enviroment
        }
                                );
        var results =  data.Results;
        for(var i = 0; i< results.length; i++){
          var properties = results[i].Properties;
          var key        = properties[0].Value;
          var value      = properties[1].Value;
          env_vars[key]  = value;
        }
        return env_vars;
      }
      function getFolderByName(proyectName){
        var complexFilter = {
          LeftOperand: {
            Property: "Name",
            SimpleOperator: 'equals',
            Value: proyectName
          }
          ,
          LogicalOperator: "AND",
          RightOperand: {
            Property: "ContentType",
            SimpleOperator: 'equals',
            Value: 'dataextension'
          }
        };
        return Folder.Retrieve(complexFilter)
      }
      function createFolder(proyectName){
        var parentFolder = getFolderByName("Data Extensions");   
        Write(parentFolder[0].ID)
       var newFolder = {
        "Name" : proyectName,
        "CustomerKey" : proyectName +"_key",
        "Description" : proyectName,
        "ContentType" : "dataextension",
        "IsActive" : "true",
        "IsEditable" : "true",
        "AllowChildren" : "true",
        "ParentFolderID" : parentFolder[0].ID
    };
        Folder.Add(newFolder);
        return getFolderByName(proyectName);
      }
    }  