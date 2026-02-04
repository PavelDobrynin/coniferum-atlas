import TreePassport from './components/TreePassport.tsx';
import { abiesSibiricaPassport } from './passportData/abiesSibirica';

function App() {
  return (
    <TreePassport
      data={abiesSibiricaPassport}
      title="Пихта сибирская (Abies sibirica)"
    />
  );
}

export default App;

