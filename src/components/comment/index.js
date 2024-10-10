import { cn as bem } from "@bem-react/classname";
import { memo } from "react";
import "./style.css";

const Comment = ({
  authorName,
  text,
  dateCreate,
  onReply,
  styles,
  isAuthorByCurrentUser,
}) => {
  const cn = bem("Comment");

  return (
    <div className={cn()} style={styles}>
      <div>
        <span
          className={cn("name", { "current-name": isAuthorByCurrentUser })}
        >
          {authorName}
        </span>
        <span className={cn("date")}>{(dateCreate)}</span>
      </div>

      <p className={cn("text")}>{text}</p>
      <button className={cn("button")} onClick={onReply}>
        Ответить
      </button>
    </div>
  );
};

export default memo(Comment);
