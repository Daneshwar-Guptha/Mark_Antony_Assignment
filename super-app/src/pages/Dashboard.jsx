import NewsWidget from "../components/NewsWidget";
import NotesWidget from "../components/NotesWidget";
import TimerWidget from "../components/TimerWidget";
import WeatherWidget from "../components/WeatherWidget";
import userAvatar from "../assets/userAvatar.png"

function Dashboard({ user, selected, notes, onNotesChange, onBrowse }) {
  return (
    <section className="dashboard-page">
      <div className="dashboard-grid">
        <div className="left-column">
          <ProfileWidget user={user} selected={selected} />
          <WeatherWidget />
          <TimerWidget />
        </div>
        <NotesWidget notes={notes} onChange={onNotesChange} />
        <NewsWidget />
      </div>
      <button className="browse-button" type="button" onClick={onBrowse}>
        Browse
      </button>
    </section>
  );
}

function ProfileWidget({ user, selected }) {
  return (
    <article className="profile-widget">
      <img
        src={userAvatar}
        alt="User avatar"
      />
      <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <strong>{user.username}</strong>
        <div className="profile-tags">
          {selected.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default Dashboard;
