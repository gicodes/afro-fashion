import "./navbar.styles.scss";

export const SideNav = ({ displayName, onSignOut }) => {
  return (
    <div className={displayName ? "card drop" : "dis-non"}>
      <div onClick={onSignOut}>Sign out</div>
    </div>
  );
};
