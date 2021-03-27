import React from "react";
import {useHistory} from "react-router-dom";
import "./menuCard.css";

const MenuCard = ({id, name, description, handleDuplicate, handleDelete }) =>
{
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={"menuCard"} onClick={onOpenMenu}>
      <div>{name}</div>
      <div>{description}</div>
      <span onClick={() => setOpen(true)} className={"icon"}/>
      {open ? (
        <div>
          <div onClick={() => handleDuplicate(id)}>Duplicate</div>
          <div onClick={() => handleDelete(id)}>Delete</div>
        </div>
      ) : null}
    </div>
  );

  function onOpenMenu()
  {
    history.push(`/menus/:${id}`);
  }
};

export default MenuCard;
