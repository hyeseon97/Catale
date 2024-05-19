import styles from "./Review.module.css";
import trash from "../../assets/common/trash.png";
import useUserStore from "../../store/useUserStore";

export default function Review({ list, setModal, setSelect }) {
  const memberId = useUserStore((state) => state.user.memberId);

  return (
    <div className={styles.container}>
      {list.map((review) => (
        <div className={styles.box} key={review.id}>
          <hr className={styles.hr} />
          <div className={styles.top}>
            <div className={styles.left}>
              <img
                src={review.profileImage}
                alt="profile"
                className={styles.profile}
              />
              <div className={styles.nickname}>{review.nickname}</div>
              <div className={styles.date}>{review.createAt.split("T")[0]}</div>
            </div>
            {memberId === review.memberId ? (
              <img
                src={trash}
                alt="trash"
                className={styles.right}
                onClick={() => {
                  setModal(true);
                  setSelect(review.id);
                }}
              />
            ) : (
              <div></div>
            )}
          </div>
          <div className={styles.mid}>{review.content}</div>
          <div className={styles.bottom}>
            <div>단맛 : {review.sweet * 20}%</div>
            <div>쓴맛 : {review.bitter * 20}%</div>
            <div>신맛 : {review.sour * 20}%</div>
            <div>탄산 : {review.sparking * 20}%</div>
          </div>
        </div>
      ))}
    </div>
  );
}
