export default function reducer(rfidtags = {}, action) {
    switch (action.type) {
      case 'TAG_UPDATE':  
        console.log(action); 
          let newTagsData = rfidtags.tagsData.map((t) =>{
            if(t.name === action.id){
              return {name: action.newID, type: action.fnc, cmd: action.cmd}
            }else{
              return t;
            }
          });
          console.log(newTagsData);
              return {
                ...rfidtags,
                tagsData: newTagsData           
              
            };
          
      case 'TAG_INIT':   
        return {           
          tagsData: action.tags
        };
      case 'TAG_ADD':   
        console.log(rfidtags.tagsData)
        let TagsArray = [...rfidtags.tagsData, {name: action.id, type: action.fnc, cmd: action.cmd}]
        console.log(TagsArray)
        return {    
          ...rfidtags,       
          tagsData: TagsArray
        };

      default:
        return rfidtags;
    }
  }
  