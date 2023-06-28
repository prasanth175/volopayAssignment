import { Component } from "react";
import './index.css'
import Navbar from "../Navbar";

import { BsSearch } from "react-icons/bs";
import { MdFilterList } from "react-icons/md";
import Cards from "../Cards";

const navList = [
    {
      id: 1,
      name: 'Your',
      isSelected: false
    },
    {
      id: 2,
      name: 'All',
      isSelected: true
    },
    {
      id: 3,
      name: 'Blocked',
      isSelected: false
    },
  ];

  const data = [
    {
      name: 'Mixmax',
      budgetName: 'Software subscription',
      ownerId: 1,
      spent: {
        value: 100,
        currency: 'SGD'
      },
      availableToSpend: {
        value: 1000,
        currency: 'SGD'
      },
      cardType: 'burner',
      expiry: '9 feb',
      limit: 100,
      status: 'active'
    },
    {
      name: 'Quickbooks',
      budgetName: 'Software subscription',
      ownerId: 2,
      spent: {
        value: 50,
        currency: 'SGD'
      },
      availableToSpend: {
        value: 250,
        currency: 'SGD'
      },
      cardType: 'subscription',
      limit: 10,
      status: 'active'
    },
    // Add more objects below
    {
      name: 'Example Card',
      budgetName: 'Sample budget',
      ownerId: 3,
      spent: {
        value: 75,
        currency: 'USD'
      },
      availableToSpend: {
        value: 500,
        currency: 'USD'
      },
      cardType: 'burner',
      expiry: '15 Mar',
      limit: 200,
      status: 'active'
    },
    {
      name: 'Another Card',
      budgetName: 'Another budget',
      ownerId: 4,
      spent: {
        value: 200,
        currency: 'EUR'
      },
      availableToSpend: {
        value: 1000,
        currency: 'EUR'
      },
      cardType: 'subscription',
      limit: 50,
      status: 'active'
    }
  ];
  
  // ... Rest of your code
  
    

class Home extends Component{
    state = {navItem: 'All', navigationList: navList, cardsData: [], isFilterModalOpen: false, subscriptionInput: false, burnerInput: false, 
            searchInput: '', type: ''}

    componentDidMount = () => {
        this.getCards()
    }

    onSearchInput = (event) => {
        const updatedData = data.filter((each) => each.name.toLowerCase().includes(event.target.value.toLowerCase()))
        this.setState({searchInput: event.target.value, cardsData: updatedData})
    }

    getCards = () => {
        const {navItem} = this.state 

        if(navItem === 'Your'){
            const updatedList = data.filter((each) => each.owner_id === 1)
            this.setState({cardsData: updatedList})
        }
        else if(navItem === 'Blocked'){
            const updatedList = data.filter((each) => each.status !== 'active')
            this.setState({cardsData: updatedList})
        }else{
            this.setState({cardsData: data})
        }
    }

    applyFilter = () => {
        console.log('hello')
        const {subscriptionInput, burnerInput} = this.state 
        console.log(subscriptionInput)
        console.log(burnerInput)
        if (subscriptionInput && burnerInput){
            this.setState({cardsData: data})
        }else if(burnerInput){
            const updatedData = data.filter((each) => each.cardType === 'burner')
            this.setState({cardsData: updatedData})
        }else if(subscriptionInput){
            const updatedData = data.filter((each) => each.cardType === 'subscription')
            console.log(updatedData)
            this.setState({cardsData: updatedData})
        }
    }

    onNavigation = (name) => {
        const updatedNavList = navList.map((each) => {
          if (each.name === name) {
            return { ...each, isSelected: true };
          } else {
            return { ...each, isSelected: false };
          }
        });

        this.setState({navItem: name, navigationList: updatedNavList}, this.getCards)
      };

      onSubscription = () => this.setState((prev) => ({subscriptionInput: !prev.subscriptionInput}))

      onBurner = () => this.setState((prev) => ({burnerInput: !prev.burnerInput}))


      toggleFilterModal = () => {
        this.setState((prevState) => ({
          isFilterModalOpen: !prevState.isFilterModalOpen,
        }));
      };
      
      searchAndFilter = () => {
        const {subscriptionInput, burnerInput, searchInput} = this.state
        return(
        <div className="input-field">
          <input className="search-input" type="text" onChange={this.onSearchInput} value={searchInput} />
          <BsSearch className="search-img" />
          <div className="filter-container" onClick={this.toggleFilterModal}>
            <MdFilterList className="filter-img" />
            <p className="filter-txt">Filter</p>
          </div>
          {/* Filter Modal */}
          {this.state.isFilterModalOpen && (
            <div className="filter-modal">
              <div className="filter-modal-content">
                {/* Add your filter content here */}
                <h2>Filters</h2>
                <hr />
                <p>Type</p>
                <div className="check-boxes">
                <label className="check-box">
                <input type="checkbox" name='type' checked={subscriptionInput} onClick={this.onSubscription} />
                Subscription
                </label>
                <label>
                <input type="checkbox" name="type" checked={burnerInput} onClick={this.onBurner} />
                Burner
                </label>
                </div>
                <hr />
                <p>Cardholder</p>
                <select className="drop-down">
                    <option>Select cardholder</option>
                </select>
                <div className="filter-buttons">
                    <button className="apply-btn" onClick={this.applyFilter}>Apply</button>
                    <button className="clear-btn">Clear</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    render(){
        const {navigationList, cardsData} = this.state
        return(
            <div>
                <Navbar navList={navigationList} onNavigation={this.onNavigation} />
                <div className="input-filter">{this.searchAndFilter()}</div>
                <Cards cardsData={cardsData} />
            </div>
        )
    }
}

export default Home