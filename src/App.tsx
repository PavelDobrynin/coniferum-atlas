import TreeCard from './components/TreeCard.tsx';

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fdfaf5' }}>
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section>
          <TreeCard
            latinName="Pinus sylvestris"
            russianName="Сосна обыкновенная"
            family="Pinaceae"
            genus="Pinus"
            nativeRange="Европа и Азия, от Скандинавии до Сибири"
            shortDescription="Один из самых распространённых видов хвойных Евразии, образующий светлохвойные боры и играющий ключевую роль в лесных экосистемах и лесном хозяйстве."
            imageUrl="https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg?auto=compress&cs=tinysrgb&w=800"
          />
        </section>
      </main>
    </div>
  );
}

export default App;

