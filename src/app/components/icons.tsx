/**
 * Font Awesome 6.7.2 drop-in replacements for the lucide-react and
 * @mui/icons-material identifiers used in this project.
 *
 * Font Awesome CSS is loaded globally via the CDN <link> in index.html,
 * so each exported component just renders an <i> element with the
 * matching `fa-solid fa-...` (or `fa-regular fa-...`) class.
 *
 * Each component accepts the props the callers historically passed:
 *   - `className`       (Tailwind w-N / h-N classes are honoured for size)
 *   - `size`            (lucide-style numeric override)
 *   - `strokeWidth`     (lucide-only — silently ignored, FA has no stroke)
 *   - `color` / `fill`  (forwarded to inline `color` style)
 *   - `sx`              (MUI-style; fontSize/color honoured)
 *   - any other DOM/event prop (forwarded to <i>)
 */
import * as React from "react";

const SIZE_CLASS_PX: Record<string, number> = {
  "w-2": 8,
  "w-2.5": 10,
  "w-3": 12,
  "w-3.5": 14,
  "w-4": 16,
  "w-5": 20,
  "w-6": 24,
  "w-7": 28,
  "w-8": 32,
  "w-9": 36,
  "w-10": 40,
  "w-12": 48,
  "w-14": 56,
  "w-16": 64,
  "w-20": 80,
  "w-24": 96,
  "w-32": 128,
};

function detectFontSize(className?: string): number | undefined {
  if (!className) return undefined;
  // arbitrary value: w-[18px], h-[18px]
  const arb = className.match(/(?:^|\s)w-\[(\d+(?:\.\d+)?)px\]/);
  if (arb) return parseFloat(arb[1]);
  for (const cls of Object.keys(SIZE_CLASS_PX)) {
    const re = new RegExp("(?:^|\\s)" + cls.replace(".", "\\.") + "(?:\\s|$)");
    if (re.test(className)) return SIZE_CLASS_PX[cls];
  }
  return undefined;
}

interface SxLike {
  fontSize?: number | string;
  color?: string;
  [k: string]: unknown;
}

export interface IconProps extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  className?: string;
  size?: number | string;
  strokeWidth?: number | string;
  color?: string;
  fill?: string;
  sx?: SxLike;
}

function makeIcon(
  faClass: string,
  variant: "solid" | "regular" | "brands" = "solid"
) {
  const Component = React.forwardRef<HTMLElement, IconProps>(function Icon(
    {
      className = "",
      size,
      strokeWidth: _strokeWidth,
      color,
      fill,
      sx,
      style,
      ...rest
    },
    ref
  ) {
    void _strokeWidth;
    const detected = detectFontSize(className);
    const sxFontSize = sx?.fontSize;
    const finalFontSize =
      typeof size === "number"
        ? `${size}px`
        : typeof size === "string"
        ? size
        : typeof sxFontSize === "number"
        ? `${sxFontSize}px`
        : typeof sxFontSize === "string"
        ? sxFontSize
        : typeof detected === "number"
        ? `${detected}px`
        : undefined;
    const finalColor = color ?? fill ?? sx?.color;
    const mergedStyle: React.CSSProperties = {
      lineHeight: 1,
      ...(finalFontSize ? { fontSize: finalFontSize } : null),
      ...(finalColor ? { color: finalColor } : null),
      ...(style ?? {}),
    };
    const cls = `fa-${variant} ${faClass} ${className}`.trim();
    return (
      <i
        ref={ref}
        className={cls}
        style={mergedStyle}
        aria-hidden="true"
        {...rest}
      />
    );
  });
  Component.displayName = faClass;
  return Component;
}

// ─────────────────────────────────────────────────────────────────────────
// lucide-react drop-in exports
// ─────────────────────────────────────────────────────────────────────────
export const AlertTriangle = makeIcon("fa-triangle-exclamation");
export const ArrowLeft = makeIcon("fa-arrow-left");
export const ArrowRight = makeIcon("fa-arrow-right");
export const ArrowUp = makeIcon("fa-arrow-up");
export const Award = makeIcon("fa-award");
export const BarChart3 = makeIcon("fa-chart-bar");
export const BookOpen = makeIcon("fa-book-open");
export const Briefcase = makeIcon("fa-briefcase");
export const Building2 = makeIcon("fa-building");
export const Calendar = makeIcon("fa-calendar");
export const Check = makeIcon("fa-check");
export const CheckCircle = makeIcon("fa-circle-check");
export const CheckCircle2 = makeIcon("fa-circle-check");
export const CheckIcon = makeIcon("fa-check");
export const ChevronDown = makeIcon("fa-chevron-down");
export const ChevronDownIcon = makeIcon("fa-chevron-down");
export const ChevronLeft = makeIcon("fa-chevron-left");
export const ChevronLeftIcon = makeIcon("fa-chevron-left");
export const ChevronRight = makeIcon("fa-chevron-right");
export const ChevronRightIcon = makeIcon("fa-chevron-right");
export const ChevronUp = makeIcon("fa-chevron-up");
export const ChevronUpIcon = makeIcon("fa-chevron-up");
export const CircleDot = makeIcon("fa-circle-dot");
export const CircleIcon = makeIcon("fa-circle");
export const ClipboardList = makeIcon("fa-clipboard-list");
export const Clock = makeIcon("fa-clock");
export const Cog = makeIcon("fa-gear");
export const Compass = makeIcon("fa-compass");
export const Copy = makeIcon("fa-copy");
export const CreditCard = makeIcon("fa-credit-card");
export const Crosshair = makeIcon("fa-crosshairs");
export const Crown = makeIcon("fa-crown");
export const Database = makeIcon("fa-database");
export const Download = makeIcon("fa-download");
export const Dumbbell = makeIcon("fa-dumbbell");
export const Edit = makeIcon("fa-pen-to-square");
export const ExternalLink = makeIcon("fa-arrow-up-right-from-square");
export const Eye = makeIcon("fa-eye");
export const FileText = makeIcon("fa-file-lines");
export const Flame = makeIcon("fa-fire");
export const FolderOpen = makeIcon("fa-folder-open");
export const Gem = makeIcon("fa-gem");
export const Gift = makeIcon("fa-gift");
export const Globe = makeIcon("fa-globe");
export const Grid3X3 = makeIcon("fa-table-cells");
export const GripVerticalIcon = makeIcon("fa-grip-vertical");
export const Handshake = makeIcon("fa-handshake");
export const Headphones = makeIcon("fa-headphones");
export const Headset = makeIcon("fa-headset");
export const Heart = makeIcon("fa-heart");
export const Home = makeIcon("fa-house");
export const Laptop = makeIcon("fa-laptop");
export const Layers = makeIcon("fa-layer-group");
export const LayoutDashboard = makeIcon("fa-table-cells-large");
export const Leaf = makeIcon("fa-leaf");
export const Loader2 = makeIcon("fa-spinner fa-spin");
export const Lock = makeIcon("fa-lock");
export const LogIn = makeIcon("fa-right-to-bracket");
export const LogOut = makeIcon("fa-right-from-bracket");
export const Mail = makeIcon("fa-envelope");
export const MapPin = makeIcon("fa-location-dot");
export const Medal = makeIcon("fa-medal");
export const Menu = makeIcon("fa-bars");
export const MessageCircle = makeIcon("fa-message");
export const MessageSquare = makeIcon("fa-comment");
export const Minus = makeIcon("fa-minus");
export const MinusIcon = makeIcon("fa-minus");
export const Monitor = makeIcon("fa-desktop");
export const MoreHorizontal = makeIcon("fa-ellipsis");
export const MoreHorizontalIcon = makeIcon("fa-ellipsis");
export const Newspaper = makeIcon("fa-newspaper");
export const Package = makeIcon("fa-box");
export const PackageOpen = makeIcon("fa-box-open");
export const Palette = makeIcon("fa-palette");
export const PanelLeftIcon = makeIcon("fa-bars-staggered");
export const Pen = makeIcon("fa-pen");
export const PenTool = makeIcon("fa-pen-nib");
export const Pencil = makeIcon("fa-pencil");
export const Phone = makeIcon("fa-phone");
export const Plus = makeIcon("fa-plus");
export const Printer = makeIcon("fa-print");
export const RotateCcw = makeIcon("fa-rotate-left");
export const Save = makeIcon("fa-floppy-disk");
export const Scissors = makeIcon("fa-scissors");
export const ScreenShare = makeIcon("fa-display");
export const Search = makeIcon("fa-magnifying-glass");
export const SearchIcon = makeIcon("fa-magnifying-glass");
export const Send = makeIcon("fa-paper-plane");
export const Shield = makeIcon("fa-shield");
export const ShieldCheck = makeIcon("fa-shield-halved");
export const Shirt = makeIcon("fa-shirt");
export const ShoppingBag = makeIcon("fa-bag-shopping");
export const ShoppingCart = makeIcon("fa-cart-shopping");
export const SlidersHorizontal = makeIcon("fa-sliders");
export const Sparkles = makeIcon("fa-wand-magic-sparkles");
export const Stamp = makeIcon("fa-stamp");
export const Star = makeIcon("fa-star");
export const Sticker = makeIcon("fa-note-sticky");
export const Sun = makeIcon("fa-sun");
export const Tag = makeIcon("fa-tag");
export const Target = makeIcon("fa-bullseye");
export const Trash2 = makeIcon("fa-trash-can");
export const TrendingUp = makeIcon("fa-arrow-trend-up");
export const Truck = makeIcon("fa-truck");
export const Upload = makeIcon("fa-upload");
export const UploadCloud = makeIcon("fa-cloud-arrow-up");
export const User = makeIcon("fa-user");
export const UserCog = makeIcon("fa-user-gear");
export const Users = makeIcon("fa-users");
export const UtensilsCrossed = makeIcon("fa-utensils");
export const Video = makeIcon("fa-video");
export const Watch = makeIcon("fa-stopwatch");
export const Wrench = makeIcon("fa-wrench");
export const X = makeIcon("fa-xmark");
export const XCircle = makeIcon("fa-circle-xmark");
export const XIcon = makeIcon("fa-xmark");
export const Zap = makeIcon("fa-bolt");

// ─────────────────────────────────────────────────────────────────────────
// @mui/icons-material drop-in exports
// (Names that collide with lucide above use the existing export.)
// ─────────────────────────────────────────────────────────────────────────
export const AccountBalanceWallet = makeIcon("fa-wallet");
export const Add = makeIcon("fa-plus");
export const AddShoppingCart = makeIcon("fa-cart-plus");
export const ArrowForward = makeIcon("fa-arrow-right");
export const AssignmentReturn = makeIcon("fa-arrow-rotate-left");
export const AttachFile = makeIcon("fa-paperclip");
export const AutoAwesome = makeIcon("fa-wand-magic-sparkles");
export const Autorenew = makeIcon("fa-arrows-rotate");
export const Badge = makeIcon("fa-id-badge");
export const CardGiftcard = makeIcon("fa-gift");
export const CloudUpload = makeIcon("fa-cloud-arrow-up");
export const CompareArrows = makeIcon("fa-right-left");
export const Create = makeIcon("fa-pen-to-square");
export const CurrencyExchange = makeIcon("fa-money-bill-transfer");
export const Description = makeIcon("fa-file-lines");
export const DesignServices = makeIcon("fa-pen-ruler");
export const EventBusy = makeIcon("fa-calendar-xmark");
export const FavoriteBorder = makeIcon("fa-heart", "regular");
export const FileDownloadOutlined = makeIcon("fa-file-arrow-down");
export const Inventory2 = makeIcon("fa-boxes-stacked");
export const LocalOffer = makeIcon("fa-tag");
export const LocalShipping = makeIcon("fa-truck");
export const LockOutlined = makeIcon("fa-lock");
export const ReceiptLong = makeIcon("fa-receipt");
export const Remove = makeIcon("fa-minus");
export const RequestQuote = makeIcon("fa-file-invoice");
export const ShareOutlined = makeIcon("fa-share-nodes");
export const StarBorder = makeIcon("fa-star", "regular");
export const VerifiedUser = makeIcon("fa-user-shield");
export const Visibility = makeIcon("fa-eye");
export const WarningAmber = makeIcon("fa-triangle-exclamation");

// ─────────────────────────────────────────────────────────────────────────
// `*Icon` aliases — many call sites historically imported MUI icons with
// the `Icon` suffix (e.g. `import AddIcon from "@mui/icons-material/Add"`).
// Re-export under those aliases so callers compile without renames.
// ─────────────────────────────────────────────────────────────────────────
export {
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Add as AddIcon,
  AddShoppingCart as AddShoppingCartIcon,
  ArrowForward as ArrowForwardIcon,
  AssignmentReturn as AssignmentReturnIcon,
  AttachFile as AttachFileIcon,
  AutoAwesome as AutoAwesomeIcon,
  Autorenew as AutorenewIcon,
  Badge as BadgeIcon,
  CardGiftcard as CardGiftcardIcon,
  CheckCircle as CheckCircleIcon,
  CloudUpload as CloudUploadIcon,
  CompareArrows as CompareArrowsIcon,
  Create as CreateIcon,
  CreditCard as CreditCardIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  Description as DescriptionIcon,
  DesignServices as DesignServicesIcon,
  EventBusy as EventBusyIcon,
  FavoriteBorder as FavoriteBorderIcon,
  FileDownloadOutlined as FileDownloadOutlinedIcon,
  Inventory2 as Inventory2Icon,
  Layers as LayersIcon,
  LocalOffer as LocalOfferIcon,
  LocalShipping as LocalShippingIcon,
  Lock as LockIcon,
  LockOutlined as LockOutlinedIcon,
  ReceiptLong as ReceiptLongIcon,
  Remove as RemoveIcon,
  RequestQuote as RequestQuoteIcon,
  ShareOutlined as ShareOutlinedIcon,
  ShoppingBag as ShoppingBagIcon,
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  VerifiedUser as VerifiedUserIcon,
  Visibility as VisibilityIcon,
  WarningAmber as WarningAmberIcon,
};
