import type { PaletteOptions } from "@material-ui/core/styles/createPalette";
import type { ThemeOptions } from "@material-ui/core/styles";

export interface TabsPaletteOptions {
  backgroundColor: string;
  contrastText: string;
  indicator: string;
}

export interface NavBarPaletteOptions {
  navBarIcon: string;
  navBarUserMenuLabel: string;
  backgroundColor: string;
}

export interface CustomComponentPaletteOptions<T> {
  primary?: T;
  secondary?: T;
  default: T;
}

export interface FugaPaletteOptions extends PaletteOptions {
  tabs: CustomComponentPaletteOptions<TabsPaletteOptions>;
  navBar: CustomComponentPaletteOptions<NavBarPaletteOptions>;
}

export interface FugaThemeOptions extends ThemeOptions {
  palette: FugaPaletteOptions;
}
