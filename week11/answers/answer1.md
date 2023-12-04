## Question 1:

Explain using code examples what is meant by props and state in React JS?

Answer:
Props are read-only components that allow you to send data from a parent component to a child component. This will allow you to access them in the child component via this.props and are similar to function parameters in that they can be used as props for class components or as direct arguments in functional components.

Data that changes over time can be stored in a component's state. It is only accessible or modifiable within that particular component.

### example code props:

function hello(props) {
return <h1>Hello, {props.title}</h1>;
}

function App() {
return <This is title="Kevin" />;
}

### example code state:

class Counter extends React.Component {
constructor(props) {
super(props);

this.state = { count: 0 }; // State is initialized in the constructor
}

render() {
return (

<div>
<p>Clicked {this.state.count} times</p>
// setState is used to update the state
<button onClick={() => this.setState({ count: this.state.count + 1 })}>
Click me
</button>
</div>
);
}
}
