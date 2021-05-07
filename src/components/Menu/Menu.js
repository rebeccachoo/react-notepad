import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

function Menu(props) {
	const classes = useStyles();
	const { list } = props;
	return (
		<div>
			<List
				component="nav"
				className={classes.root}
				aria-label="mailbox folders"
			>
				{list.map((li, index) => {
					return (
						<ListItem
							button
							key={index}
							onClick={() => props.itemClicked(li.id)}
							style={{ cursor: "pointer" }}
						>
							<ListItemIcon>
								<FolderIcon />
							</ListItemIcon>
							<ListItemText primary={li.data.title}>
								{li.data.title}
							</ListItemText>
							<DeleteOutlineIcon onClick={() => props.deleteItem(li.id)} />
							<Divider light />
						</ListItem>
					);
				})}
			</List>
		</div>
	);
}

export default Menu;
