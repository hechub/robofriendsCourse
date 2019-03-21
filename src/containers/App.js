import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';


class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(value => {

                return value.json();
            })
            .then(users => {
                console.log('AKI', users);
                if (users) {
                    this.setState(
                        {
                            robots: users
                        }
                    )
                } else {
                    this.setState(
                        {
                            robots: []
                        }
                    )
                }
            })
    }

    onSearchChange = (event) => {
        this.setState(
            {
                searchfield: event.target.value
            }
        )
    }

    render() {
        const { searchfield, robots } = this.state;

        const filteredRobots = robots.filter(robots => {
            return robots.name.toLowerCase().includes(searchfield.toLowerCase());
        });
        if (robots.length === 0) {
            return <h1>Loading</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 >RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>

            );
        }

    }
}

export default App;