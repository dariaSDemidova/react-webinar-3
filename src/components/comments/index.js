import { cn as bem } from "@bem-react/classname";
import React, { memo, useCallback, useLayoutEffect, useRef, useState } from "react";
import CommentMessage from "../comment-message";
import Comment from "../comment";
import CommentInput from "../comment-input";
import "./style.css";

const Comments = ({ comments, onSubmit, isUserAuth, currentUser, pathToLogin }) => {
  const cn = bem("Comments");
  const [showNewCommentTextArea, setShowNewCommentTextArea] = useState(true);
  const [showReplyComment, setShowReplyComment] = useState(false);
  const [itemIdToReply, setItemIdToReply] = useState('');
  const [itemIdToScroll, setItemIdToScroll] = useState('');
  const [widthUList, setWidthUList] = useState(0);

  const allLiElementsRef = useRef([]);
  const ulRef = useRef();

  useLayoutEffect(() => {
    if (ulRef.current) {
      setWidthUList(ulRef.current.offsetWidth);
    }
  }, [ulRef.current]);

  const handleReply = useCallback((id) => {
    setShowReplyComment(true);
    setShowNewCommentTextArea(false);
    setItemIdToReply(id);

    const lastReplyId = comments.findLast((comment) => comment.parent._id === id)?._id;
    setItemIdToScroll(lastReplyId ?? id);

    const elem = allLiElementsRef.current[lastReplyId ?? id];
    elem?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [comments]);

  const handleCancel = useCallback(() => {
    setShowReplyComment(false);
    setShowNewCommentTextArea(true);
    allLiElementsRef.current[itemIdToReply]?.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => {
      setItemIdToReply('');
      setItemIdToScroll('');
    }, 0);
  }, [itemIdToReply]);

  const handleSubmit = useCallback((text) => onSubmit(text, itemIdToReply), [onSubmit, itemIdToReply]);

  return (
    <section className={cn()}>
      <h2 className={cn("title")}>
        Комментарии ({comments.length || 0})
      </h2>

      {comments.length > 0 && (
        <ul className={cn("list")} ref={ulRef}>
          {comments.map((comment) => (
            <li
              key={comment._id}
              style={{ marginLeft: `${Math.min(comment.level * 30, Math.floor(widthUList / 2))}px` }}
              ref={(el) => allLiElementsRef.current[comment._id] = el}
            >
              <Comment
                isAuthorByCurrentUser={comment.author?._id === currentUser._id}
                onReply={() => handleReply(comment._id)}
                styles={{ marginBottom: itemIdToScroll === comment._id ? "30px" : "0" }}
                authorName={comment.author?.profile?.name || currentUser?.profile?.name}
                {...comment}
              />

              {itemIdToScroll === comment._id &&
                showReplyComment &&
                (isUserAuth ? (
                  <CommentInput
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isModeReply={true}
                  />
                ) : (
                  <CommentMessage
                    isModeReply={true}
                    onCancel={handleCancel}
                    pathToLogin={pathToLogin}
                  />
                ))}
            </li>
          ))}
        </ul>
      )}

      {showNewCommentTextArea &&
        (isUserAuth ? (
          <CommentInput onSubmit={handleSubmit} />
        ) : (
          <CommentMessage pathToLogin={pathToLogin} />
        ))}
    </section>
  );
};

export default memo(Comments);
