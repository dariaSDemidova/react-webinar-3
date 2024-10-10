import { cn as bem } from "@bem-react/classname";
import { memo, useState } from "react";
import "./style.css";

const CommentInput = ({ onSubmit, onCancel, isModeReply = false }) => {
  const cn = bem("CommentInput");
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim().length === 0) {
      setText("");
      return;
    }

    onSubmit(text.trim());
    setText("");
  };

  return (
    <section className={cn()}>
      <h3 className={cn("title")}>
        {isModeReply ? "Новый ответ" : "Новый комментарий"}
      </h3>
      <textarea
        className={cn("input")}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={cn("submit")} onClick={handleSubmit}>
        Отправить
      </button>

      {isModeReply && (
        <button className={cn("cancel")} onClick={onCancel}>
          Отмена
        </button>
      )}
    </section>
  );
};

export default memo(CommentInput);
