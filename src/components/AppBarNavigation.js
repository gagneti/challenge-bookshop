import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { styled } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';

class AppBarNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar position="sticky" style={{ marginBottom: 16 }}>
        <Toolbar>
          <MyLink to="/list">
            <MyIconButton>
              <HomeOutlinedIcon />
            </MyIconButton>
          </MyLink>

          <Title>An amazing Book Shop!</Title>

          <MyLink to="/cart">
            <Badge badgeContent={this.props.badgeCounter} color="secondary">
              <ShoppingCartOutlinedIcon />
            </Badge>
            <MyIconButton></MyIconButton>
          </MyLink>
        </Toolbar>
      </AppBar>
    );
  }
}

const MyIconButton = styled(IconButton)({
  edge: 'start',
  color: 'inherit',
  marginRight: 10,
});

const Title = styled(Typography)({
  fontSize: 16,
  variant: 'h6',
  flexGrow: 1,
});

const MyLink = styled(Link)({
  color: 'white',
});

export default AppBarNavigation;
