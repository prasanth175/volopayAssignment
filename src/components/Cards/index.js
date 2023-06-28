import { Component } from "react";
import './index.css'

class Cards extends Component {
    render(){
        const {cardsData} = this.props
        return(
            <>
            {cardsData.length === 0 ? <div className="no-cards">No Cards are Available</div> : 
            <div className="cards-container">
            {cardsData.map((each) => {
            const spentPercentage = Math.floor((each.spent.value / (each.spent.value + each.availableToSpend.value)) * 100)
            const balancePercentage = Math.ceil((each.availableToSpend.value / (each.spent.value + each.availableToSpend.value)) * 100)
            return (
                <div className="each-card" key={each.name}>
                <div className="card-top-container">
                    <div className="card-heading-container">
                        <h1>Linkedin</h1>
                        <p>Memberfive . Budget</p>
                    </div>
                     <p className="card-type">{each.cardType}</p>
                </div>
                <div className="card-mid-container">
                    <div className="card-mid-item">
                        <p className="mid-heading">AMOUNT</p>
                        <p className="mid-value">{each.spent.value}{each.spent.currency}</p>
                    </div>
                    <div className="card-mid-item">
                        <p className="mid-heading">FREQUENCY</p>
                        <p className="mid-value">Monthly</p>
                    </div>
                    <div className="card-mid-item">
                        {each.cardType === 'burner' ? <p className="mid-heading">EXPIRY</p> : <p className="mid-heading">LIMIT</p>}
                        {each.cardType === 'burner' ? <p className="mid-value">{each.expiry}</p> : <p className="mid-value">{each.limit}</p>}
                    </div>
                </div>

                <div className="horizontal-bar">
                    <div className="bar-segment spent" style={{ width: `${spentPercentage}%` }}></div>
                    <div className="bar-segment balance" style={{width:  `${balancePercentage}%` }}></div>
                    </div>

                <div className='card-bottom-container'>
                <div className="card-bottom-item">
                    <p className='bottom-spent'>Spent</p>
                        <p className="bottom-txt">{each.spent.value} {each.spent.currency}</p>
                    </div>
                    <div className="card-bottom-item">
                        <p className='bottom-balance'>Balance</p>
                        <p className="bottom-txt">{each.availableToSpend.value} {each.availableToSpend.currency}</p>
                    </div>
                </div>
            </div>
            )})}
        </div>
            }
            </>
        )
    }
}

export default Cards