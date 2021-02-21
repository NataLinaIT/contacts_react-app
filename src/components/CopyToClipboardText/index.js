import PropTypes from "prop-types";
import {
  ClickAwayListener,
  createStyles,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { useCopyToClipboard } from "react-use";
import Button from "@material-ui/core/Button";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { useCallback, useState } from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      cursor: "pointer",
    },
    icon: {
      marginRight: theme.spacing(3),
    },
  })
);

const STATUS_COPY = {
  COPY: "copy",
  COPIED: "copied",
};

const TITLE_BY_STATUS = {
  [STATUS_COPY.COPY]: "Copy",
  [STATUS_COPY.COPIED]: "Copied",
};

export const CopyToClipboardText = ({ text }) => {
  const classes = useStyles();
  const [, CopyToClipboard] = useCopyToClipboard();
  const [statusCopy, setStatusCopy] = useState("copy");

  const onClickCopy = useCallback(() => {
    CopyToClipboard(text);
    setStatusCopy(STATUS_COPY.COPIED);
  }, [CopyToClipboard, text]);

  const onClickAway = useCallback(() => {
    setStatusCopy(STATUS_COPY.COPY);
  }, [setStatusCopy]);

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Tooltip title={TITLE_BY_STATUS[statusCopy]} placement="top" arrow>
        <Button
          display="flex"
          align="center"
          className={classes.root}
          onClick={onClickCopy}
        >
          <FileCopyOutlinedIcon fontSize="small" className={classes.icon} />
          {text}
        </Button>
      </Tooltip>
    </ClickAwayListener>
  );
};

CopyToClipboardText.propTypes = {
  text: PropTypes.string.isRequired,
};
