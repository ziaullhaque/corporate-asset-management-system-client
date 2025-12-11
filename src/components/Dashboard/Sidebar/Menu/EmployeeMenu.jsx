import React from "react";
import MenuItem from "./MenuItem";
import { MdAddShoppingCart, MdGroups, MdInventory } from "react-icons/md";

const EmployeeMenu = () => {
  return (
    <div>
      <>
        <MenuItem icon={MdInventory} label="My Assets" address="my-assets" />
        <MenuItem
          icon={MdAddShoppingCart}
          label="Request Asset"
          address="request-asset"
        />
        <MenuItem icon={MdGroups} label="My Team" address="my-team" />
      </>
    </div>
  );
};

export default EmployeeMenu;
