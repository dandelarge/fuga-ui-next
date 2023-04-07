import { Box, Menu, MenuItem, Theme, Typography } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from './styles';

interface MenuOption {
  id: string;
  label: string;
  href: string;
  links?: MenuOption[];
}

interface Props {
  title: string;
  links: MenuOption[];
  className?: string;
  isMobile?: boolean;
  color: 'primary' | 'secondary' | 'default';
  children?: React.ReactNode;
}

const MenuLinks = React.forwardRef<HTMLDivElement, Props>(
  function MenuLinksComponent({ title, links, className, isMobile, color = 'default', children }, ref) {
    const classes = useStyles({ color });
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [subAnchorEl, setSubAnchorEl] = useState<HTMLElement | null>(null);
    const [subList, setSubList] = useState<MenuOption[]>([]);

    const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = useCallback(() => {
      setAnchorEl(null);
    }, []);

    const handleSubMenuClick = useCallback(
      (item: MenuOption, event: React.MouseEvent<HTMLLIElement>) => {
        if (!links) return;

        let newSubList = links.find(link => link.id === item.id);

        if (!newSubList || !newSubList.links) return;

        setSubAnchorEl(event.currentTarget);
        setSubList(newSubList.links);
      },
      [links]
    );

    const handleSubMenuClose = useCallback(() => {
      setSubList([]);
      setSubAnchorEl(null);
    }, []);

    return (
      <div ref={ref}>
        {!isMobile ? (
          <Box onClick={handleClick} className={className}>
            {children}
            {<ArrowDropDown className={classes.menuArrowIcon} />}
          </Box>
        ) : (
          <Box onClick={handleClick}>
            <MenuIcon className={classes.hamburger} />
          </Box>
        )}
        <Menu
          id="navbar-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          {links.map(menuOption =>
            !menuOption.links ? (
              <MenuItem
                key={`link-${title}-${menuOption.label}`}
                data-test-id={`masthead--menu__option--${menuOption.id}`}
                onClick={handleClose}
                component={Link}
                href={menuOption.href}
              >
                <Typography
                  className={classes.menuItemText}
                  title={menuOption.label}
                  data-test-id={`masthead--menu__link--${menuOption.id}`}
                >
                  {menuOption.label}
                </Typography>
              </MenuItem>
            ) : (
              <MenuItem
                key={`link-${title}-${menuOption.label}`}
                data-test-id={`masthead--menu__option--${menuOption.id}`}
                onClick={event => handleSubMenuClick(menuOption, event)}
              >
                {menuOption.label}
                <ArrowRightIcon className={classes.arrowRightIcon} />
                <Menu
                  id="sub-menu"
                  anchorEl={subAnchorEl}
                  keepMounted
                  open={Boolean(subAnchorEl)}
                  onClose={handleSubMenuClose}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                >
                  {subList.length > 0
                    ? subList.map(subMenuOption => (
                      <MenuItem
                        className={classes.menuItemText}
                        key={`link-${title}-${subMenuOption.label}`}
                        data-test-id={`masthead--submenu__option--${menuOption.id}`}
                        onClick={() => {
                          handleClose();
                          handleSubMenuClose();
                        }}
                        component={Link}
                        href={subMenuOption.href}
                      >
                        <Typography
                          className={classes.menuItemText}
                          title={subMenuOption.label}
                          data-test-id={`masthead--submenu__link--${menuOption.id}`}
                        >
                          {subMenuOption.label}
                        </Typography>
                      </MenuItem>
                    ))
                    : null}
                </Menu>
              </MenuItem>
            )
          )}
        </Menu>
      </div>
    );
  }
);

export default MenuLinks;
