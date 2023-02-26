export function updateTag(id, newID, cmd, newCmd, fnc, newFnc) {
  return {
    type: 'TAG_UPDATE',
    id: id,
    newID: newID,
    cmd: newCmd,
    fnc: newFnc
  };
}

export function addTag(id, cmd, fnc) {
  console.log(id, cmd, fnc)
  return {
    type: 'TAG_ADD',
    id: id,
    cmd: cmd,
    fnc: fnc
  };
}

export function removeTag(id) {
  return {
    
  };
}

export function loadTags() {
  return (dispatch, getState) => {
    fetch('https://node.purv.de/tags')
        .then((res) => {return res.json()})
        .then((data) => {        
           var tagArray = data.tagsData;
           dispatch({
            type: 'TAG_INIT',
            tags: tagArray
          });         
        })
        .catch((err) => {
           console.log(err.message);
        });  
    }
}