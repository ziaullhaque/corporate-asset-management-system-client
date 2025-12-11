import React from "react";
import MenuItem from "./MenuItem";
import {
  MdAddBox,
  MdPendingActions,
  MdPeopleAlt,
  MdViewList,
  MdWorkspacePremium,
} from "react-icons/md";

const HRMenu = () => {
  return (
    <div>
      <>
        <MenuItem icon={MdViewList} label="Asset List" address="asset-list" />
        <MenuItem icon={MdAddBox} label="Add Asset" address="add-asset" />
        <MenuItem
          icon={MdPendingActions}
          label="All Requests"
          address="all-requests"
        />
        <MenuItem
          icon={MdPeopleAlt}
          label="Employee List"
          address="employee-list"
        />
        <MenuItem
          icon={MdWorkspacePremium}
          label="Upgrade Package"
          address="upgrade-package"
        />
      </>
    </div>
  );
};

export default HRMenu;
