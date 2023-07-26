import courses from "./data/db.json";
const App = () => {
  return <></>;
  return (
    <main className="main-content">
      <h1 className="heading">WebEdu Kurslar</h1>
      <Cart cartItems={cartItems} />
      <div className="cards container">
        {courses.map(course => (
          <Card key={course.id} onAddItem={onAddItem} onRemoveItem={onRemoveItem} course={course} />
        ))}
      </div>
    </main>
  );
};

export default App;
