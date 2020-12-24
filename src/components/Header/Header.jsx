import React from 'react'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import logo from '../../assets/img/icons/logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { getIsSignedIn } from '../../reducks/users/selector'
import { push } from 'connected-react-router'
import { HeaderMenus } from './index'

const useStyles = makeStyles({
   root: {
      flexGrow: 1,
   },
   menuBar: {
      backgroundColor: '#fff',
      color: '#444'
   },
   toolBar: {
      margin: '0 auto',
      maxWidth: 1024,
      width: '100%'
   },
   iconButtons: {
      margin: '0 0 0 auto'
   }
})

const Header = () => {
   const classes = useStyles();
   const dispatch = useDispatch()
   const selecor = useSelector(state => state);
   const isSignedIn = getIsSignedIn(selecor);
   
   return (
      <div className={classes.root}>
         <AppBar position='fixed' className={classes.menuBar}> 
            <ToolBar className={classes.toolBar}>
               <img
                  src={logo} alt="Torahack Logo" width='128px'
                  onClick={() => dispatch(push('/'))}
               />
               {isSignedIn && (
                  <div className={classes.iconButtons}>
                     <HeaderMenus />
                  </div>
               )}
            </ToolBar>
         </AppBar>
      </div>
   )
}

export default Header