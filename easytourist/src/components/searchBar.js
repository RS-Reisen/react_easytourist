import { Component } from 'react';
import './searchBar.css'

export default class SearchBar extends Component {
    constructor() {
        super();
        this.today = new Date().toISOString().split('T')[0]
        this.state = { destination: '', travelDate: this.today }
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search)
        this.setState({destination: params.getAll('destination').join(',') || '', travelDate: params.get('travelDate') || this.state.travelDate})
    }

    search = () => {
        let searchString = '?'
        for (let d of this.state.destination.replaceAll(' ','').split(',')) {
            console.log('Adding', d)
            if (d !== '') searchString += `&destination=${d}`
        }
        searchString += `&travelDate=${this.state.travelDate}`
        window.location.search = searchString
    }

    render() {
        return (
            <form className="search-bar">
                <div className="destination-field" title="z.B.: Bodensee oder DEU ">
                    <label htmlFor="destination">
                        <svg width="15" height="22" viewBox="0 0 15 22"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.17701 21.2401C6.63736 20.5777 6.10398 19.9444 5.59522 19.2922C4.0173 17.2711 2.56874 15.1632 1.43779 12.8509C0.827667 11.6028 0.330495 10.3154 0.0963889 8.93391C-0.413335 5.92531 1.13659 2.80025 3.84595 1.39833C8.15205 -0.829973 13.2633 1.62398 14.2441 6.39649C14.5424 7.84548 14.3262 9.25127 13.8623 10.6333C13.2169 12.5578 12.2385 14.3125 11.1433 16.0061C9.98877 17.7814 8.71402 19.4748 7.32809 21.0741C7.29044 21.1178 7.25134 21.1581 7.17701 21.2401ZM7.18956 5.2212C6.68272 5.2213 6.18727 5.37243 5.76584 5.6555C5.34441 5.93858 5.0159 6.34089 4.82183 6.81159C4.62776 7.2823 4.57684 7.80028 4.6755 8.30007C4.77416 8.79986 5.01797 9.25903 5.37613 9.61957C5.73428 9.9801 6.19071 10.2258 6.68773 10.3257C7.18475 10.4255 7.70005 10.375 8.16852 10.1805C8.63699 9.98602 9.03761 9.6563 9.31974 9.233C9.60187 8.8097 9.75286 8.31183 9.75362 7.80229C9.75548 7.4631 9.69044 7.12691 9.56228 6.81314C9.43413 6.49936 9.24538 6.21424 9.00696 5.97423C8.76854 5.73423 8.48517 5.54411 8.17323 5.41486C7.86129 5.2856 7.52696 5.21978 7.18956 5.2212Z"
                                fill="black" fillOpacity="0.9" />
                        </svg>
                    </label>
                    <input type="text" id="destination" name="destination" placeholder='Ziel'
                    value={this.state.destination} onChange={(e) => this.setState({...this.state, destination: e.target.value})}/>
                </div>
                <div className="travel-dates-field">
                    <label htmlFor="travel-dates">
                        <svg width="19" height="21" viewBox="0 0 19 21"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.0782 2.95002H16.1591C16.6129 2.95002 17.0672 2.95708 17.5205 2.95002C18.2358 2.9364 18.8672 3.48872 18.9786 4.15755C18.9936 4.25418 19.0007 4.35184 18.9999 4.4496C18.9999 9.3073 18.9999 14.1652 18.9999 19.0232C18.9999 19.6436 18.7074 20.0976 18.1605 20.3891C17.9524 20.5001 17.722 20.5228 17.4885 20.5223H14.8837C10.4302 20.5223 5.97669 20.5223 1.52317 20.5223C1.10956 20.5223 0.75141 20.3937 0.454814 20.1107C0.181141 19.8611 0.0184906 19.5141 0.00254369 19.1458C0.00254369 19.1105 0 19.0752 0 19.0399C0 14.1744 0 9.30882 0 4.44304C0 3.92049 0.224863 3.51243 0.636943 3.20121C0.85796 3.03558 1.12811 2.94725 1.40514 2.95002C1.88488 2.94599 2.36412 2.95002 2.84386 2.95002H2.91915C2.91915 2.92026 2.92272 2.89555 2.92272 2.87083C2.92272 2.50312 2.91763 2.13491 2.92729 1.76771C2.94256 1.20833 3.18624 0.758909 3.61562 0.400785C3.92206 0.141987 4.31197 0.000776513 4.7145 0.00281426C4.97498 0.00281426 5.23545 0.00281426 5.49593 0.00281426C6.12371 0.00735386 6.60651 0.289313 6.97585 0.777067C7.19358 1.0704 7.30976 1.4257 7.30704 1.7899C7.31213 2.14954 7.30704 2.50968 7.30704 2.86982V2.94346H11.6904V2.87587C11.6904 2.51775 11.6802 2.15963 11.6934 1.80201C11.7214 1.03784 12.1004 0.490569 12.7836 0.152116C13.013 0.0446953 13.2648 -0.00716878 13.5183 0.00079662C13.7828 0.00079662 14.0473 0.00079662 14.3114 0.00079662C15.1559 0.0154242 15.9195 0.676188 16.0467 1.50391C16.0652 1.62968 16.0745 1.75662 16.0747 1.88372C16.0788 2.21208 16.0747 2.53944 16.0747 2.86982L16.0782 2.95002ZM1.46568 7.34737V19.0651H17.5353V7.34737H1.46568ZM13.1555 3.50486V5.10734C13.1551 5.14252 13.1565 5.17771 13.1596 5.21276C13.165 5.28977 13.1981 5.36229 13.2529 5.41711C13.3077 5.47192 13.3806 5.50537 13.4582 5.51136C13.529 5.51692 13.5999 5.51894 13.6709 5.51741C13.8779 5.51741 14.0855 5.52347 14.2921 5.51187C14.4986 5.50026 14.6151 5.36509 14.6151 5.16333C14.6151 4.06205 14.6151 2.96061 14.6151 1.859C14.6151 1.64564 14.4844 1.50592 14.2697 1.50038C14.0153 1.49382 13.7609 1.49432 13.5066 1.50038C13.3178 1.50492 13.1988 1.60529 13.1647 1.77427C13.1579 1.81679 13.1552 1.85985 13.1565 1.90289C13.1559 2.43721 13.1555 2.97121 13.1555 3.50486ZM5.84594 3.51697C5.84594 2.9707 5.84594 2.42494 5.84594 1.87918C5.84594 1.63051 5.71214 1.49937 5.46082 1.49836C5.23189 1.49836 5.00313 1.49836 4.77453 1.49836C4.52016 1.49836 4.38585 1.63354 4.38585 1.88271C4.38585 2.9665 4.38585 4.05028 4.38585 5.13407C4.38585 5.38224 4.51914 5.51641 4.76843 5.51741C4.9994 5.51741 5.23036 5.51741 5.46133 5.51741C5.49541 5.51731 5.52942 5.51461 5.56308 5.50934C5.63202 5.49994 5.69611 5.46893 5.746 5.42083C5.79588 5.37273 5.82894 5.31007 5.84034 5.24201C5.84655 5.19926 5.84893 5.15605 5.84747 5.11289C5.84645 4.58091 5.84594 4.04894 5.84594 3.51697Z"
                                fill="black" fillOpacity="0.9"/>
                        </svg>
                    </label>
                    <input type="date" id="travel-dates" name="travelDate" placeholder='Anreise...'
                        value={this.state.travelDate} onChange={(e) => this.setState({...this.state, travelDate: e.target.value})} />
                </div>
                <div className="search-field">
                    <input type="button" value="suchen" onClick={this.search} />
                </div>
            </form>
        )
    }
}