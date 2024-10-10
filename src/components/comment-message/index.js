import { cn as bem } from "@bem-react/classname";
import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const CommentMessage = ({ onCancel, pathToLogin, isModeReply = false }) => {
  const cn = bem("CommentMessage");
  const location = useLocation();

  return isModeReply ? (
    <div>
      <Link to={pathToLogin} state={{ back: location.pathname }} className={cn("enter")}>
        Войдите
      </Link>
      , чтобы иметь возможность комментировать. {" "}
      <button
        type="button"
        className={cn("cancel")}
        onClick={onCancel}
      >
        Отмена
      </button>
    </div>
  ) : (
    <div>
      <Link to={pathToLogin} state={{ back: location.pathname }} className={cn("enter")}>
        Войдите
      </Link>
      , чтобы иметь возможность комментировать
    </div>
  );
};

export default memo(CommentMessage);
