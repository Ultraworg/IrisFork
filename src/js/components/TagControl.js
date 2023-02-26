import React, { useEffect } from 'react';
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Link from './Link';
import Icon from './Icon';
import TextField from './Fields/TextField';
import { Button } from './Button';
import * as tagActions from '../services/tags/actions';
import { I18n } from '../locale';

const TagControl = (it) => {  
  const { id } = useParams();
  if (!id) return null;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  let current_cmd = useSelector((state) => state.rfidtags.tagsData.filter((tag) => tag.name === id)[0].cmd);
  let current_fnc = useSelector((state) => state.rfidtags.tagsData.filter((tag) => tag.name === id)[0].type);
  
  const rfidTags = useSelector((state) => state.rfidtags);
  const current_tagstore = useSelector((state) => state.rfidtags.tagsData);
  const current_id = id;

  const removeTag = () => dispatch(tagActions.removeTag(id));
  const updateTag = (id, newID, cmd, newCmd, fnc, newFnc) => {
    dispatch(tagActions.updateTag(id, newID, cmd, newCmd, fnc, newFnc));
    navigate(`/rfid/tags/${newID}`);
  };
  const saveTags = () => {fetch('https://node.purv.de/updateTags', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify((({ tagsData }) => ({ tagsData }))(rfidTags))
  } )
      .then((res) => {return res.json()})     
      .catch((err) => {
         console.log(err.message);
      });  
  };

  const getLatestTag = () => { 
    fetch('https://node.purv.de/tagid')
      .then((res) => {return res.text()})
      .then((data) => {
         console.log(data);
         updateTag(id, data, current_cmd, current_cmd, current_fnc, current_fnc)
      })
      .catch((err) => {
         console.log(err.message);
      });
      
  }

  let isCurrent = false;
  let isPlaceholder = id === "placeholder" ? true : false;


  var cmd = null;
  var fnc = null; 
  current_tagstore.map((data, key) => {
    if(data.name === id){
      isCurrent = true;
      cmd = data.cmd;
      fnc = data.type;
    }    
  });

  return (
    <div className="sub-tabs__content">
      <label className="field">
        <div className="name">
          <I18n path="rfid.tag.id" />
        </div>
        <div className="input">
          <TextField
            onChange={(value) => updateTag(id, value, current_cmd, current_cmd, current_fnc, current_fnc)}
            type="text"
            value={id || ''}
          />
        </div>
      </label>
      <label className="field">
        <div className="name">
          <I18n path="rfid.tag.cmd" />
        </div>
        <div id="cmd" className="input">
          <TextField
            onChange={(value) => updateTag(id, id, current_cmd, value, current_fnc, current_fnc)}
            value={current_cmd || ''}
          />
        </div>
      </label>
      <label className="field">
        <div className="name">
          <I18n path="rfid.tag.type" />
        </div>
        <div className="input">
          <TextField
            onChange={(value) => updateTag(id, id, current_cmd, current_cmd, current_fnc, value)}
            type="text"
            value={current_fnc || ''}
          />
        </div>
      </label>

      <Button        
        onClick={saveTags}  
      >
        <I18n path={`rfid.tag.update`} />
      </Button>
      <Button
        type="destructive"
        onClick={removeTag}
      >
        <I18n path="actions.remove" />
      </Button>
      {!isPlaceholder ? null : (
        <Button
        onClick={getLatestTag}
      >
        <I18n path="rfid.getLatestScan" />
      </Button>
      )}
    </div>
  );
};


const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addTag = () => {    
    dispatch(tagActions.addTag("placeholder", "placeholder", "playback"));
    navigate(`/rfid/tags/placeholder`);
  };

  const current_tagstore = useSelector((state) => state.rfidtags.tagsData);
  
  return (    
      <div className="menu__inner" id="rfid-tags-menu">
        {current_tagstore.map((tag) => {
          let status = (
            <span className="status mid_grey-text">
              {tag.cmd}
            </span>
          );         
          return (            
              <Link
                className="grid__item"
                activeClassName="grid-item--active"
                to={`/rfid/tags/${tag.name}`}
                scrollTo="#rfid-tags-menu"
                key={tag.name}
              >
                <div className="menu-item__inner">
                  <Icon className="menu-item__icon" name={'nfc'} />
                  <div className="menu-item__title">
                    {tag.name}
                  </div>
                  {status}
                </div>
              </Link>           
          );
        })}
        <div className="grid__item">
        <span
          className="menu-item menu-item--add"
          onClick={addTag}
        >
          <div className="menu-item__inner">
            <Icon className="menu-item__icon" name="add" />
            <div className="menu-item__title">
              <I18n path="actions.add" />
            </div>
            <span className="status mid_grey-text">
              <I18n path="rfid.addTag" />
            </span>
          </div>
        </span>
        </div>        
      </div>
    
  );
};

const TagControls = () => (
  <div className="grid">
    <Menu />    
    <Routes>
      <Route path="tags/:id" element={<TagControl />} />
    </Routes>
  </div>
);

export default TagControls;
