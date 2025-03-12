import { Button } from './components/ui/button';

const App = () => {
  return (
    <div className="ml-10">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p className="text-xl font-bold underline text-red-400">
        Hello from React
      </p>
      <Button>Click me</Button>
    </div>
  );
};

export default App;
