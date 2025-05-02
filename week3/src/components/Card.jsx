// Card.jsx

import style from './Card.module.css';

const Card = ({ members }) => {
  return (
    <div className={style.container}>
      {members.map((member) => (
        <div key={member.id} className={style.card}>
          <h2>{member.name}</h2>
          <p>깃허브: {member.github}</p>
          <p>영문이름: {member.englishName}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;