Question 1:
Explain using code examples what is meant by props and state in React JS?

Answer:
Props let you transmit data from a parent component to a child component; they are read-only. They can be accessible in the child component via this.props and are comparable to function parameters,either directly as arguments in functional components or as props for class components.

A component's state is a way of storing data that changes over time. It is contained within that component and can only be accessed or changed there.

example code props:

function hello(props) {
return <h1>Hello, {props.title}</h1>;
}

function App() {
return <This is title="Sara" />;
}

example code state:

class Counter extends React.Component {
constructor(props) {
super(props);
// State is initialized in the constructor
this.state = { count: 0 };
}

render() {
return (
<div>
<p>You clicked {this.state.count} times</p>
// setState is used to update the state
<button onClick={() => this.setState({ count: this.state.count + 1 })}>
Click me
</button>
</div>
);
}
}
