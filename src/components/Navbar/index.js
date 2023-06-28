import { Component } from "react";
import './index.css'

class Navbar extends Component {
  onNavBtn = (event) => {
    const { onNavigation } = this.props;
    onNavigation(event.target.textContent);
  }

  render() {
    const {navList} = this.props
    return (
      <nav className="navbar">
        {navList.map((each) => (
          <button
            key={each.id}
            className={`nav-btn ${each.isSelected ? 'clicked' : ''}`}
            type="button"
            onClick={this.onNavBtn}
          >
            {each.name}
          </button>
        ))}
      </nav>
    );
  }
}

export default Navbar;
