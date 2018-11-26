function Navbar(props){
  return (
    <nav className= "navbar">
      <NavLink
        className= "home-name"
        to= '/'> <img src={logo} className= "main-logo" alt= "logo" />
      </NavLink>
      <NavLink
        className="nav-button"
        to="/photographers"> <button className="nav-button p-browse"> Photographers </button></NavLink>
        <div>

         <NavLink
         to="/login"> <button className="nav-button login"> Log In  </button></NavLink>
         <NavLink
         to="/started">  <button className="nav-button started"> Get started  </button></NavLink>
       </div>
    </nav>





    <div class="pusher">
      <div class="ui menu asd borderless" style="border-radius: 0!important; border: 0; margin-left: 260px; -webkit-transition-duration: 0.1s;">
        <a class="item openbtn">
          <i class="icon content"></i>
        </a>
        <a class="item">Messages
                    </a>
        <div class="right menu">
          <div class="ui dropdown item">
            Language <i class="dropdown icon"></i>
            <div class="menu">
              <a class="item">English</a>
              <a class="item">Russian</a>
              <a class="item">Spanish</a>
            </div>
          </div>
          <div class="item">
            <div class="ui primary button">Sign Up</div>
          </div>
        </div>
      </div>
    </div>
