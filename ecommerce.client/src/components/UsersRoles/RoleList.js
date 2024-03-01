const RoleList = (props) => {

    const roles = props.roles;
    const userRoles = props.userRoles;

    function isExists(roleName) {
        if (userRoles.length <= 0) return false;
        return userRoles.includes(roleName);
    }

    const roleList = (
        <div>
            <ul className="checkBoxList">
                {
                    roles.map((role, index) => (

                        <li key={index}>
                            <input type="checkbox" checked={isExists(role.roleName)} value={role.roleName} onChange={props.onChange} ></input>
                            <span className="input-group-addon">&nbsp;</span>
                            <label>{role.roleName}</label>
                        </li>
                    )
                    )
                }
            </ul>
        </div>
    );

    return roleList;
}

export default RoleList;