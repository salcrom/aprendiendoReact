
import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";

const users = [
    { userName: "midudev", name: "Miguel Ángel Durán", initialIsFollowing: true },
    { userName: "salcrom", name: "Sergio Alcántara Romero", initialIsFollowing: false },
    { userName: "pedromichel", name: "Pedro Michel", initialIsFollowing: true },
    { userName: "vxnder", name: "Vanderhart", initialIsFollowing: false },
    { userName: "pheralb", name: "Pablo Hernandez", initialIsFollowing: true },
];


export function App() {
    

    return (
        <section className="App">
            {users.map(user => {
                const { userName, name, initialIsFollowing } = user;
                return (
                    <TwitterFollowCard
                        key={userName}
                        userName={userName}
                        initialIsFollowing={initialIsFollowing}
                    >
                        {name}
                    </TwitterFollowCard>
                );
            })}
        </section>
    );
}
