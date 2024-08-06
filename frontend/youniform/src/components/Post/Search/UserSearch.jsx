import React from "react";

const UserSearch = ({ results }) => {
  return (
    <div>
      user search다!!!!!!!!!!!
      {results ? results : <>없음</>}
    </div>
  );
};

export default UserSearch;
