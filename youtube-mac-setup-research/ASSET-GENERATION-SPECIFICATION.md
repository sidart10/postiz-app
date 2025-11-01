# Asset Generation Specification for AI Image Agent

**Video:** "ai agents run my mac" (25-minute YouTube)
**Generated:** October 28, 2025
**For:** AI Image Generator Agent
**Design System:** Minimal Modern (clean, professional, tech-focused)
**Total Assets:** 8 graphics (6 static diagrams, 2 animated sequences)

---

## Design System Overview

### Core Aesthetic: Minimal Modern Tech

**Principles:**
- Clean, uncluttered compositions
- Generous negative space (40-60% of canvas)
- Monochromatic base with strategic color accents
- Sans-serif typography (Inter, SF Pro, or similar)
- Professional, enterprise-grade appearance
- No gradients unless specifically requested
- Flat design with subtle depth cues (shadows, borders)

**Color Philosophy:**
- Base: Pure black (#000000) or dark charcoal (#1A1A1A) backgrounds
- Text: Pure white (#FFFFFF) for primary, light gray (#D4D4D4) for secondary
- Accents: Use OFFICIAL brand colors ONLY (researched below)
- Contrast: Maintain WCAG AA minimum (4.5:1 for text)

**Typography Requirements:**
- Font: SF Pro (Apple ecosystem) or Inter (cross-platform)
- Weights: Regular (400), Medium (500), Bold (700)
- Sizes:
  - Titles: 48-72pt
  - Headings: 32-48pt
  - Body: 18-24pt
  - Labels: 12-16pt
- Line height: 1.3-1.5x (optimal readability)
- Letter spacing: -0.02em for titles, 0em for body

---

## Accurate Brand Colors - Researched & Verified

### Claude AI (Anthropic)
**Official Colors:**
- Primary Accent: `#C15F3C` (Crail - warm terracotta orange)
- Background Light: `#F4F3EE` (Pampas - cream off-white)
- Background Dark: `#B1ADA1` (Cloudy - muted taupe)
- Text: `#FFFFFF` (white)

**Logo Style:**
- Clean wordmark with custom serif font (Copernicus)
- Icon: Abstract starburst/pinwheel
- Themes: Light and dark variants available

**Usage in Video:**
- Use `#C15F3C` as primary accent when showing Claude Code
- Pair with dark backgrounds (#000000 or #1A1A1A)
- Logo: Use SVG format, dark theme variant

---

### Homebrew
**Official Colors:**
- Dark Brown: `#7A2C08` (Kenyan Copper)
- Tan/Beige: `#F3CB73` (Golden Sand - primary)
- Orange Accent: `#E3631A` (Hot Cinnamon)

**Logo Style:**
- Minimalist beer mug icon
- Tan/beige primary color
- Dark brown for text

**Usage in Video:**
- Use `#F3CB73` as primary Homebrew color
- Pair with dark backgrounds for contrast
- Logo: Simple icon, no complex gradients

---

### Raycast
**Official Colors:**
- Accent: `#FF6363` (Bittersweet Red - primary)
- Dark Background: `#202123` (Shark)
- Light Background: `#FFFFFF` (White)
- Secondary: `#808080` (Gray)

**Logo Style:**
- Minimalist wordmark
- Red accent color dominant
- Dark/light theme variants

**Usage in Video:**
- Use `#FF6363` when showing Raycast
- Pairs well with dark backgrounds
- High contrast, easily recognizable

---

### GitHub
**Official Colors:**
- Primary: `#000000` (Black)
- Interface Blue: `#4078C0`
- Success Green: `#6CC644`
- Danger Red: `#BD2C00`
- Background: `#FAFAFA` (off-white)

**Logo Style:**
- Octocat icon (recognizable silhouette)
- Black on light, white on dark
- Simple, iconic

**Usage in Video:**
- Use `#4078C0` (GitHub blue) for MCP server references
- Black for logo (#000000)
- Octocat icon optional but recognizable

---

### Gmail (Google)
**Official Colors:**
- Blue: `#4285F4`
- Red: `#EA4335`
- Yellow: `#FBBC05`
- Green: `#34A853`

**Logo Style:**
- "M" envelope icon with 4-color palette
- Recognizable multicolor design
- Don't use single color (loses brand recognition)

**Usage in Video:**
- Use all 4 colors when showing Gmail
- Email icon with multicolor "M"
- Don't simplify to monochrome (loses brand identity)

---

### Slack
**Official Colors:**
- Blue: `#36C5F0`
- Yellow: `#ECB22E`
- Red: `#E01E5A`
- Green: `#2EB67D`
- Aubergine (Primary): `#4A154B`
- Black: `#000000`

**Logo Style:**
- Hashtag/overlapping shapes (4 colors)
- Aubergine for wordmark
- Multicolor icon

**Usage in Video:**
- Use `#4A154B` (aubergine) for Slack branding
- Multicolor icon (blue, yellow, red, green)
- Don't use single color logo (loses brand identity)

---

### VS Code (Visual Studio Code)
**Official Colors:**
- Primary Blue: `#0078D7` (Microsoft blue)
- Background: `#1E1E1E` (dark theme)
- Text: `#D4D4D4` (light gray)

**Logo Style:**
- Blue ribbon/infinity symbol
- Simple, recognizable icon
- Dark/light variants

**Usage in Video:**
- Use `#0078D7` for VS Code references
- Icon: Blue ribbon shape
- Pairs with dark backgrounds

---

### Node.js
**Official Colors:**
- Primary Green: `#339933` (PANTONE 360 C)
- Dark Green: `#3C873A` (May Green)
- Charcoal: `#303030`

**Logo Style:**
- Hexagon with overlapping bands
- Green primary color
- Modern, geometric

**Usage in Video:**
- Use `#339933` (primary green)
- Hexagon icon recognizable
- Green = Node.js (strong association)

---

### Docker
**Official Colors:**
- Moby Blue (Primary): `#0DB7ED` (cyan blue)
- Dark Blue: `#384D54`
- Off Black: `#202020`
- White: `#FFFFFF`

**Logo Style:**
- Whale with containers (iconic)
- Blue primary color
- Simple, recognizable silhouette

**Usage in Video:**
- Use `#0DB7ED` (Moby Blue)
- Whale icon with containers
- Highly recognizable, don't modify

---

## Asset-by-Asset Specifications

### ASSET 1: MCP Architecture Diagram
**Type:** STATIC IMAGE (not video)
**Used At:** 4:00-8:00 (persistent), 17:00-18:00 (recap)
**Duration Visible:** ~4 minutes total
**Aspect Ratio:** 16:9 (1920x1080px minimum)

**Why Static:** This is a reference diagram viewers need to study. Animation would be distracting. Needs to stay on screen while you explain each component.

#### Visual Requirements

**Layout:**
```
┌─────────────────────────────────────────┐
│                                         │
│         CLAUDE CODE (center)            │
│                  ↓                      │
│      ┌──────────┼──────────┐           │
│      │          │          │            │
│   MCP Ring (surrounding)               │
│   - Filesystem                          │
│   - Chrome DevTools                     │
│   - GitHub                              │
│   - Gmail (custom)                      │
│   - Slack (custom)                      │
│      │          │          │            │
│      └──────────┼──────────┘           │
│                  ↓                      │
│    Your Systems (outermost)             │
│    - Files, Browser, Repos, Email,     │
│      Chat                               │
│                                         │
└─────────────────────────────────────────┘
```

**Structure:**
- **Center Node:** "Claude Code"
  - Size: Large circle (200px diameter)
  - Color: `#C15F3C` (Claude orange)
  - Border: 3px solid white
  - Icon: Claude starburst icon (if available) OR "CC" text
  - Label: "CLAUDE CODE" (white text, SF Pro Bold, 24pt)

- **Ring 1: MCP Servers** (surrounding center, 5 nodes)
  - Size: Medium circles (120px diameter each)
  - Spacing: Evenly distributed in circle around center
  - Colors: Use brand colors for each:
    - Filesystem: `#808080` (gray - neutral)
    - Chrome: `#4285F4` (Google blue)
    - GitHub: `#4078C0` (GitHub blue)
    - Gmail: `#EA4335` (Gmail red - or use Google multicolor "M")
    - Slack: `#4A154B` (Slack aubergine)
  - Border: 2px solid white
  - Labels: Tool name below each node (white text, SF Pro Medium, 16pt)
  - Icons: Use simplified brand icons (optional, can use text initials if complex)

- **Ring 2: Your Systems** (outermost, 5 nodes)
  - Size: Small circles (80px diameter each)
  - Colors: Light gray `#606060`
  - Border: 1px solid white
  - Labels: System name (white text, SF Pro Regular, 14pt)
  - Connected to corresponding MCP with lines

**Connecting Lines:**
- Style: Solid white lines, 2px width
- Opacity: 60% (`rgba(255,255,255,0.6)`)
- From: Claude Code → each MCP server
- From: Each MCP server → corresponding system

**Background:**
- Color: Pure black `#000000` OR dark charcoal `#1A1A1A`
- Texture: Optional subtle noise at 2% opacity
- No gradients

**Canvas:**
- Size: 1920x1080px (16:9)
- Padding: 100px on all sides (generous breathing room)
- Format: PNG with transparency (if needed) or solid background

#### Prompt for AI Image Agent

```json
{
  "asset_name": "mcp_architecture_diagram",
  "type": "diagram",
  "aspect_ratio": "16:9",
  "size": "1920x1080",
  "aesthetic": "minimal_modern_tech",

  "prompt": "Professional technical architecture diagram showing a three-tier system on pure black background (#000000).

CENTER: Large circle (200px) containing 'CLAUDE CODE' text in white, SF Pro Bold 24pt, with orange accent border (#C15F3C, 3px solid). Optional: Claude starburst icon inside.

RING 1 (MCP Servers): Five medium circles (120px) evenly spaced around center, connected by white lines (2px, 60% opacity):
- Filesystem MCP: Gray circle (#808080), white border 2px, label 'Filesystem' in white SF Pro Medium 16pt
- Chrome DevTools MCP: Blue circle (#4285F4), white border 2px, label 'Chrome DevTools'
- GitHub MCP: Blue circle (#4078C0), white border 2px, label 'GitHub'
- Gmail MCP: Red circle (#EA4335), white border 2px, label 'Gmail'
- Slack MCP: Aubergine circle (#4A154B), white border 2px, label 'Slack'

RING 2 (Your Systems): Five small circles (80px) at outer edge, connected to corresponding MCP servers:
- Gray circles (#606060), white border 1px
- Labels: 'Files', 'Browser', 'Repos', 'Email', 'Chat' in white SF Pro Regular 14pt

CONNECTING LINES: White solid lines (2px width, 60% opacity), from center to Ring 1, Ring 1 to Ring 2.

STYLE: Flat design, no gradients, clean technical diagram, generous negative space (100px padding all sides), professional enterprise-grade appearance.

TEXT: All labels crisp, high contrast, easily readable.

OVERALL: Clean, modern, technical, immediately understandable architecture visualization.",

  "negative_prompt": "gradients, 3D effects, shadows, textures, busy patterns, decorative elements, amateur design, clip art, stock photo style, blurry text, illegible labels, crowded composition, poor contrast, cartoonish, playful design, hand-drawn elements, sketchy lines, uneven spacing, misaligned elements",

  "brand_colors_verified": {
    "claude": "#C15F3C",
    "chrome_gmail": "#4285F4 and #EA4335",
    "github": "#4078C0",
    "slack": "#4A154B",
    "neutral_gray": "#808080 and #606060"
  },

  "quality_requirements": {
    "clarity": "10/10 - Instantly understandable hierarchy",
    "technical_quality": "9/10 - Sharp, crisp, no artifacts",
    "composition": "9/10 - Balanced, proper spacing",
    "color_accuracy": "10/10 - EXACT hex codes required",
    "typography": "9/10 - All labels legible, professional",
    "professionalism": "10/10 - Enterprise-grade",
    "prompt_accuracy": "10/10 - All elements precisely placed"
  },

  "provider": "mcp__gpt-image-1__create_image",
  "provider_reasoning": "Complex diagram with multiple text labels and precise positioning requires OpenAI's superior composition capabilities"
}
```

---

### ASSET 2: Permission Boundaries Visualization
**Type:** STATIC IMAGE (not video)
**Used At:** 6:30-7:30
**Duration Visible:** 60 seconds
**Aspect Ratio:** 16:9 (1920x1080px)

**Why Static:** File/folder security visualization. Viewers need to see and understand the permission structure clearly. Animation adds no value.

#### Visual Requirements

**Layout:**
```
┌─────────────────────────────────────────┐
│  Folder Tree with Color-Coded Zones    │
│                                         │
│  ✅ ALLOWED (Green)    ❌ DENIED (Red) │
│                                         │
│  📁 /Users/sid/                        │
│    ├── 📁 1.Projects  ✅              │
│    ├── 📁 2.Sid      ✅              │
│    ├── 📁 3.Resources ✅              │
│    ├── 📁 4.Archive   ✅              │
│    ├── 📁 Downloads   ✅              │
│                                         │
│  📁 /System/          ❌              │
│  📁 /Library/         ❌              │
│                                         │
└─────────────────────────────────────────┘
```

**Structure:**
- **Folder Tree:** Left-aligned, clean hierarchy
  - Font: SF Mono (monospace), 18pt
  - Color: White text on black background
  - Folder icons: Use macOS-style folder emoji 📁 OR simple folder icon
  - Indentation: 40px per level

- **Permission Indicators:**
  - Allowed folders: Green checkmark ✅ OR green background highlight `rgba(52,168,83,0.2)`
  - Denied folders: Red X ❌ OR red background highlight `rgba(234,67,53,0.2)`
  - Position: Right of folder name

- **Legend:**
  - Top-right corner
  - "✅ ALLOWED" in green (`#34A853`)
  - "❌ DENIED" in red (`#EA4335`)
  - Font: SF Pro Medium, 16pt

**Background:**
- Color: Black `#000000` OR dark charcoal `#1A1A1A`
- Clean, minimal

**Canvas:**
- Size: 1920x1080px
- Padding: 80px all sides

#### Prompt for AI Image Agent

```json
{
  "asset_name": "permission_boundaries_folder_tree",
  "type": "diagram",
  "aspect_ratio": "16:9",
  "size": "1920x1080",

  "prompt": "Clean macOS-style folder tree diagram on pure black background (#000000) showing file system permissions for MCP server access.

LEFT-ALIGNED FOLDER TREE in white monospace font (SF Mono, 18pt):
📁 /Users/sid/
  ├── 📁 1.Projects ✅
  ├── 📁 2.Sid ✅
  ├── 📁 3.Resources ✅
  ├── 📁 4.Archive ✅
  ├── 📁 Downloads ✅

📁 /System/ ❌
📁 /Library/ ❌

PERMISSION INDICATORS:
- Green checkmarks (✅) next to allowed folders, OR subtle green background highlight (rgba(52,168,83,0.2))
- Red X symbols (❌) next to denied folders, OR subtle red background highlight (rgba(234,67,53,0.2))

TOP-RIGHT LEGEND:
'✅ ALLOWED' in green (#34A853), SF Pro Medium 16pt
'❌ DENIED' in red (#EA4335), SF Pro Medium 16pt

STYLE: Minimal, clean, professional macOS aesthetic, high contrast white text on black, generous padding (80px all sides), crisp typography, flat design, no shadows or 3D effects.

TEXT MUST BE: Perfectly sharp, easily readable, monospace for folder tree, sans-serif for legend.",

  "negative_prompt": "gradients, 3D effects, decorative elements, busy patterns, blurry text, illegible labels, crowded spacing, poor contrast, cartoonish icons, hand-drawn style, uneven alignment, complex shadows, textures, ornamental design",

  "brand_colors_verified": {
    "green_allowed": "#34A853",
    "red_denied": "#EA4335",
    "text_white": "#FFFFFF",
    "background_black": "#000000"
  },

  "quality_requirements": {
    "clarity": "10/10 - Permission structure instantly clear",
    "typography": "10/10 - Monospace for folders, crisp and readable",
    "color_accuracy": "10/10 - Exact green/red hex codes",
    "professionalism": "9/10 - Clean macOS aesthetic"
  },

  "provider": "mcp__gpt-image-1__create_image"
}
```

---

### ASSET 3: Agent Architecture Diagram (Detailed)
**Type:** STATIC IMAGE (not video)
**Used At:** 12:00-13:00 (intro), 17:00-18:00 (recap)
**Duration Visible:** 2 minutes total
**Aspect Ratio:** 16:9 (1920x1080px)

**Why Static:** Hierarchical architecture diagram. Needs to be studied. Animation would distract from understanding the modular skill system.

#### Visual Requirements

**Layout:**
```
┌─────────────────────────────────────────┐
│                                         │
│      MAC MASTER AGENT (top, large)     │
│                 │                       │
│         ┌───────┼───────┐              │
│         │       │       │               │
│    5 Skills (second tier)               │
│    - email-summary                      │
│    - slack-catchup                      │
│    - calendar-briefing                  │
│    - file-organizer                     │
│    - app-installer                      │
│         │       │       │               │
│         └───────┼───────┘              │
│                 │                       │
│      MCP Servers (bottom tier)          │
│      Connected to respective skills     │
│                                         │
└─────────────────────────────────────────┘
```

**Structure:**

**Tier 1: Master Agent (Top)**
- Large rounded rectangle (600px wide × 120px tall)
- Color: `#C15F3C` (Claude orange) with 20% opacity fill, 3px solid border
- Text: "MAC MASTER AGENT" (white, SF Pro Bold, 36pt, centered)
- Subtext: "Orchestrates all skills and MCP access" (light gray #D4D4D4, SF Pro Regular, 16pt)
- Position: Top-center, 150px from top edge

**Tier 2: Skills (Middle, 5 boxes)**
- Medium rounded rectangles (320px wide × 100px tall each)
- Color: Dark gray `#2A2A2A` fill, white border 2px
- Spacing: 40px between each box
- Layout: 3 on top row, 2 on bottom row (staggered)
- Position: 250px below master agent

Skills (left to right, top row then bottom):
1. **email-summary**
   - Icon: 📧 OR Gmail colors (`#EA4335`)
   - Label: "Email Summary" (white, SF Pro Medium, 20pt)
   - Subtext: "Gmail MCP" (light gray, 14pt)

2. **slack-catchup**
   - Icon: Slack hashtag OR color `#4A154B`
   - Label: "Slack Catchup"
   - Subtext: "Slack MCP"

3. **calendar-briefing**
   - Icon: 📅 OR Google Calendar colors
   - Label: "Calendar Briefing"
   - Subtext: "Calendar MCP"

4. **file-organizer** (bottom left)
   - Icon: 📁 OR folder icon
   - Label: "File Organizer"
   - Subtext: "Filesystem MCP"

5. **app-installer** (bottom right)
   - Icon: 📦 OR Homebrew color `#F3CB73`
   - Label: "App Installer"
   - Subtext: "Homebrew + Filesystem"

**Tier 3: MCP Servers (Bottom, condensed)**
- Small rounded rectangles (280px wide × 60px tall, 5 total)
- Color: Very dark gray `#1A1A1A` fill, gray border `#404040` 1px
- Spacing: 30px between each
- Layout: Horizontal row, centered
- Position: 200px below skills tier

MCP Servers (left to right):
- Filesystem (`#808080` accent dot)
- Chrome DevTools (`#4285F4` accent dot)
- GitHub (`#4078C0` accent dot)
- Gmail (`#EA4335` accent dot)
- Slack (`#4A154B` accent dot)

**Connecting Lines:**
- From Master Agent to each Skill: White dashed lines (2px, dash: 8px, gap: 4px)
- From each Skill to corresponding MCP: Solid white lines (2px)
  - email-summary → Gmail MCP
  - slack-catchup → Slack MCP
  - calendar-briefing → Calendar MCP (new)
  - file-organizer → Filesystem MCP
  - app-installer → Filesystem MCP + Homebrew (split connection)
- Opacity: 50% for lines

**Background:**
- Pure black `#000000`
- Optional: Subtle radial gradient from center (very subtle, #1A1A1A at center fading to #000000)

**Typography:**
- All text: SF Pro family
- High contrast: white on dark
- No font smaller than 14pt (readability)

#### Prompt for AI Image Agent

```json
{
  "asset_name": "agent_architecture_hierarchical",
  "type": "diagram",
  "aspect_ratio": "16:9",
  "size": "1920x1080",

  "prompt": "Professional hierarchical architecture diagram on pure black background (#000000) showing modular AI agent system with three tiers.

TIER 1 (TOP): Large rounded rectangle (600×120px) labeled 'MAC MASTER AGENT' in white SF Pro Bold 36pt, orange accent border (#C15F3C, 3px solid), subtitle 'Orchestrates all skills and MCP access' in light gray (#D4D4D4) SF Pro Regular 16pt, centered 150px from top.

TIER 2 (MIDDLE): Five skill boxes (320×100px rounded rectangles), dark gray fill (#2A2A2A), white border 2px, arranged in staggered layout (3 top row, 2 bottom row), 40px spacing between boxes, 250px below master agent:

Top Row (left to right):
1. 'Email Summary' - subtitle 'Gmail MCP' - red accent dot (#EA4335)
2. 'Slack Catchup' - subtitle 'Slack MCP' - aubergine accent dot (#4A154B)
3. 'Calendar Briefing' - subtitle 'Calendar MCP' - blue accent dot (#4285F4)

Bottom Row:
4. 'File Organizer' - subtitle 'Filesystem MCP' - gray accent dot (#808080)
5. 'App Installer' - subtitle 'Homebrew + Filesystem' - tan accent dot (#F3CB73)

All labels: White SF Pro Medium 20pt, subtexts: Light gray (#D4D4D4) SF Pro Regular 14pt.

TIER 3 (BOTTOM): Five small rounded rectangles (280×60px), very dark gray fill (#1A1A1A), gray border (#404040, 1px), horizontal row centered, 30px spacing, 200px below skills:
- 'Filesystem', 'Chrome DevTools', 'GitHub', 'Gmail', 'Slack'
- Each with colored accent dot matching Tier 2 colors

CONNECTING LINES:
- Master Agent → Skills: White dashed lines (2px, dash 8px gap 4px, 50% opacity)
- Skills → MCP Servers: White solid lines (2px, 50% opacity), connect each skill to corresponding MCP

STYLE: Minimal modern tech aesthetic, flat design, no gradients or 3D effects, crisp typography, high contrast white text on black, generous padding, clean alignment, professional enterprise diagram.

TECHNICAL: All text must be perfectly sharp and legible, exact hex codes required, precise positioning, balanced composition.",

  "negative_prompt": "3D effects, gradients, shadows, decorative patterns, ornamental elements, busy background, poor text contrast, blurry labels, misaligned boxes, uneven spacing, amateur design, clip art style, hand-drawn elements, textured backgrounds, complex shadows, illegible text, crowded composition, cartoonish appearance",

  "brand_colors_critical": {
    "claude_orange": "#C15F3C",
    "gmail_red": "#EA4335",
    "slack_aubergine": "#4A154B",
    "google_chrome_blue": "#4285F4",
    "github_blue": "#4078C0",
    "homebrew_tan": "#F3CB73",
    "neutral_grays": ["#808080", "#606060", "#2A2A2A", "#1A1A1A", "#404040"],
    "text_colors": ["#FFFFFF", "#D4D4D4"]
  },

  "quality_requirements": {
    "clarity": "10/10",
    "color_accuracy": "10/10 - CRITICAL: Exact hex codes for all brand colors",
    "typography": "10/10 - All labels must be crisp",
    "composition": "9/10 - Hierarchical, balanced",
    "professionalism": "10/10"
  },

  "provider": "mcp__gpt-image-1__create_image"
}
```

---

### ASSET 4: File Structure Tree (Code-Style)
**Type:** STATIC IMAGE (not video)
**Used At:** 14:30-16:00
**Duration Visible:** 90 seconds
**Aspect Ratio:** 16:9 (1920x1080px)

**Why Static:** Code file tree. Developers need to see the exact structure. Static is clearer than animation for reference material.

#### Visual Requirements

**Layout:**
```
.claude/
├── agents/
│   └── mac-master-agent.md
└── skills/
    ├── email-summary.md
    ├── slack-catchup.md
    ├── calendar-briefing.md
    ├── file-organizer.md
    └── app-installer.md
```

**Structure:**
- **Terminal/Code Style Aesthetic**
- Font: SF Mono (monospace), 22pt
- Color: Green on black (classic terminal)
  - Text: `#00FF00` (bright green) OR `#4AF626` (softer green)
  - Background: Pure black `#000000`
- Line height: 1.5x (better readability)
- Syntax highlighting optional:
  - Directories: Cyan `#00FFFF` or keep white
  - Files: Green `#00FF00`
  - Tree characters (├──, └──): Gray `#808080`

**Alternative Style (Modern):**
- VS Code style instead of terminal
- Background: `#1E1E1E` (VS Code dark theme)
- Text: `#D4D4D4` (VS Code foreground)
- Folders: `#569CD6` (VS Code folder blue)
- Files: `#9CDCFE` (VS Code file cyan)

**Canvas:**
- Size: 1920x1080px
- Padding: 200px all sides (file tree centered)
- Optional: Border around tree area for emphasis

#### Prompt for AI Image Agent

```json
{
  "asset_name": "file_structure_tree",
  "type": "code_visualization",
  "aspect_ratio": "16:9",
  "size": "1920x1080",

  "prompt": "Clean monospace terminal-style file tree diagram on pure black background (#000000) showing Claude Code agent directory structure.

FILE TREE in bright green (#00FF00) SF Mono 22pt, centered on canvas:

.claude/
├── agents/
│   └── mac-master-agent.md
└── skills/
    ├── email-summary.md
    ├── slack-catchup.md
    ├── calendar-briefing.md
    ├── file-organizer.md
    └── app-installer.md

STYLE: Classic terminal aesthetic, bright green text on pure black, monospace font, tree characters (├──, └──, │) in light gray (#808080), crisp text rendering, 1.5x line height for readability, generous padding (200px all sides), centered composition.

ALTERNATIVE (if green too harsh): Use VS Code dark theme style - background #1E1E1E, folders in blue (#569CD6), files in cyan (#9CDCFE), tree lines in gray (#808080).

TEXT REQUIREMENTS: Perfectly sharp, easily readable at 1920×1080, no anti-aliasing artifacts, clean monospace rendering.

OVERALL: Professional code editor aesthetic, minimal, clean, developer-friendly.",

  "negative_prompt": "blurry text, illegible characters, proportional fonts, decorative elements, gradients, shadows, 3D effects, textures, busy backgrounds, poor contrast, uneven spacing, misaligned tree characters, amateur typography, pixelated text, font rendering issues",

  "quality_requirements": {
    "clarity": "10/10 - File structure immediately clear",
    "technical_quality": "10/10 - Crisp monospace text rendering",
    "typography": "10/10 - CRITICAL for code visualization",
    "color_accuracy": "9/10 - Terminal green or VS Code colors",
    "professionalism": "9/10 - Clean code aesthetic"
  },

  "provider": "mcp__gpt-image-1__create_image",
  "note": "Text rendering is critical - OpenAI typically handles monospace better than Gemini"
}
```

---

### ASSET 5: Skill Execution Flow (Animated Sequence)
**Type:** ANIMATED DIAGRAM (video/GIF preferred if AI can generate, else static with implied motion)
**Used At:** 17:00-18:00
**Duration:** 60 seconds
**Aspect Ratio:** 16:9 (1920x1080px)

**Why Animated (if possible):** Shows PROCESS flow - data moving from user → agent → skills → MCPs → systems → back to user. Animation helps visualize the sequence. BUT only if it's clean and adds value.

**Fallback:** If AI can't generate clean animation, use static diagram with numbered sequence indicators.

#### Visual Requirements

**Animation Sequence (if generating video):**
```
Frame 1 (0-2s): User input appears
Frame 2 (2-4s): Master agent receives command
Frame 3 (4-6s): Agent routes to skills (connections light up)
Frame 4 (6-8s): Skills execute in parallel (3 skills glow)
Frame 5 (8-10s): MCPs interact with systems (data flows shown)
Frame 6 (10-12s): Results return to user (summaries appear)
```

**Static Version (if animation not feasible):**
- Numbered sequence (1→2→3→4→5→6)
- Arrows showing flow direction
- Color progression (fade from white → orange → white)
- Clear visual hierarchy

**Layout (Static or First Frame):**
```
[User Input: "morning briefing"]
         ↓
[Mac Master Agent receives command]
         ↓
    ┌────┼────┐
    ↓    ↓    ↓
[email-summary] [slack-catchup] [calendar-briefing]
    ↓    ↓    ↓
[Gmail MCP] [Slack MCP] [Calendar MCP]
    ↓    ↓    ↓
[Gmail Inbox] [Slack Workspaces] [Google Calendar]
    ↓    ↓    ↓
[Results merge back to user]
```

**Colors:**
- Input box: Light gray `#404040`, white text
- Master Agent: Orange `#C15F3C`, white text
- Skills: Dark gray `#2A2A2A`, white text, colored accent bars
- MCPs: Brand colors (Gmail red, Slack aubergine, Google blue)
- Systems: Light gray `#606060`
- Result: Green `#34A853` (success color)

**Animation (if video):**
- Each step highlights sequentially (1 second per step)
- Connecting lines appear with glow effect
- Boxes fade in when active
- Data flow visualized as subtle particles OR lines lighting up
- Loop 2-3 times for 60-second duration

**Background:**
- Black `#000000`
- Clean, no distractions

#### Prompt for AI Image Agent

```json
{
  "asset_name": "skill_execution_flow_sequence",
  "type": "process_diagram_animated",
  "aspect_ratio": "16:9",
  "size": "1920x1080",
  "format": "static_with_sequence_indicators",
  "note": "Request animation only if AI video generator can create clean, professional motion graphics. Otherwise use static diagram with numbered sequence.",

  "prompt_static": "Professional process flow diagram on pure black background (#000000) showing sequential skill execution in AI agent system.

TOP TO BOTTOM FLOW with 6 stages, connected by white arrows (3px, 80% opacity):

STAGE 1 (TOP):
Box (400×80px), light gray (#404040), white text SF Pro Medium 18pt: 'User Input: \"morning briefing\"'

STAGE 2:
Arrow down (50px) →
Box (500×100px), orange (#C15F3C), white text SF Pro Bold 24pt: 'MAC MASTER AGENT', subtitle 'Receives & routes command'

STAGE 3:
Arrow splits into 3 →
Three parallel boxes (300×90px each), dark gray (#2A2A2A), white text SF Pro Medium 18pt, horizontal row with 30px spacing:
- 'email-summary' (red accent bar #EA4335)
- 'slack-catchup' (aubergine accent bar #4A154B)
- 'calendar-briefing' (blue accent bar #4285F4)
Subtitle on each: 'Executes skill' (light gray #D4D4D4, 14pt)

STAGE 4:
Arrows down from each skill →
Three MCP boxes (280×70px), brand color backgrounds:
- Gmail MCP (red #EA4335)
- Slack MCP (aubergine #4A154B)
- Calendar MCP (blue #4285F4)
White text, SF Pro Medium 16pt

STAGE 5:
Arrows down →
Three system boxes (280×60px), light gray (#606060):
- 'Gmail Inbox'
- 'Slack Workspaces'
- 'Google Calendar'
White text 14pt

STAGE 6 (BOTTOM):
Arrows merge back up →
Large box (600×100px), green (#34A853), white text SF Pro Bold 22pt: 'SUMMARIES RETURNED TO USER'

SEQUENCE INDICATORS:
Numbers 1-6 in circles (40px diameter, white border 2px, orange fill #C15F3C) positioned at left of each stage.

STYLE: Clean flow diagram, clear vertical hierarchy, professional enterprise aesthetic, crisp typography, high contrast, generous spacing between stages (60-80px), centered composition.

ALL TEXT: Perfectly sharp, easily readable, high contrast white on dark.",

  "negative_prompt": "blurry text, illegible labels, crowded composition, poor alignment, uneven spacing, decorative elements, gradients (except subtle radial if specified), complex shadows, 3D effects, amateur design, busy patterns, low contrast, pixelated text, font artifacts",

  "brand_colors_critical": {
    "claude_orange": "#C15F3C",
    "gmail_red": "#EA4335",
    "slack_aubergine": "#4A154B",
    "google_calendar_blue": "#4285F4",
    "success_green": "#34A853",
    "grays": ["#404040", "#2A2A2A", "#606060"],
    "text": "#FFFFFF and #D4D4D4"
  },

  "quality_requirements": {
    "clarity": "10/10 - Flow sequence must be instantly clear",
    "composition": "9/10 - Hierarchical top-to-bottom flow",
    "color_accuracy": "10/10 - Exact brand colors",
    "typography": "10/10 - All labels crisp",
    "professionalism": "10/10"
  },

  "provider": "mcp__gpt-image-1__create_image",

  "video_alternative_note": "IF AI video generator can create clean animated version showing: arrows lighting up sequentially (1s per stage), boxes fading in, data flow particles, looping 2-3 times over 60s - then request video. Otherwise stick with static diagram with sequence numbers."
}
```

---

### ASSET 6: Morning Routine Summary Overlays (3 separate cards)
**Type:** STATIC IMAGES (3 separate cards, not video)
**Used At:** 19:00-20:15 (each card shows for 25 seconds)
**Aspect Ratio:** 1:1 (1080x1080px) - Overlay friendly
**Format:** PNG with transparency

**Why Static:** These are data cards that viewers need to read. Animation would make text hard to read. Clean, readable overlays work best.

#### Card 1: Email Summary (19:00-19:25)

**Visual Requirements:**

**Layout:**
```
┌─────────────────────────┐
│  📧 EMAIL SUMMARY      │
│                         │
│  🚨 2 Urgent           │
│  ⏰ 2 Action Items     │
│  ℹ️  20 FYI            │
│  🗑️  38 Ignored        │
│                         │
│  4 emails need         │
│  your attention        │
└─────────────────────────┘
```

**Structure:**
- Card size: 800×600px (will overlay on video at ~400×300px)
- Background: Dark gray `#1A1A1A` with 10% opacity blur OR solid
- Border: 2px solid `#EA4335` (Gmail red)
- Corner radius: 12px
- Padding: 40px all sides

**Content:**
- Header: "📧 EMAIL SUMMARY"
  - Icon: Gmail-style envelope (red #EA4335) OR emoji
  - Text: White SF Pro Bold 32pt
  - Underline: 2px red line below

- Stats (4 lines):
  - 🚨 2 Urgent - Red text `#EA4335`, SF Pro Medium 24pt
  - ⏰ 2 Action Items - Yellow text `#FBBC05`, SF Pro Medium 24pt
  - ℹ️ 20 FYI - Blue text `#4285F4`, SF Pro Medium 24pt
  - 🗑️ 38 Ignored - Gray text `#808080`, SF Pro Medium 24pt
  - Spacing: 20px between lines

- Summary text:
  - "4 emails need your attention"
  - White text `#FFFFFF`, SF Pro Regular 20pt
  - 40px padding from stats

**Background Glow (optional):**
- Subtle red glow around card (`#EA4335` at 5% opacity, 20px blur)

#### Card 2: Slack Catchup (19:40-20:05)

**Same structure as Email card, but:**
- Border color: `#4A154B` (Slack aubergine)
- Header: "💬 SLACK CATCHUP"
- Glow: Aubergine

**Content:**
- 📌 8 Mentions - Aubergine text `#4A154B`
- ✅ 0 Urgent - Green text `#34A853`
- 🔔 3 Discussions - Blue text `#36C5F0` (Slack blue)
- Summary: "Catch up during 10am break"

#### Card 3: Calendar Briefing (20:15-20:40)

**Same structure, but:**
- Border color: `#4285F4` (Google Calendar blue)
- Header: "📅 TODAY'S SCHEDULE"
- Glow: Blue

**Content:**
- 🕐 3 Meetings - Blue text `#4285F4`
- 🧠 2 Focus Blocks - Green text `#34A853`
- ⚠️ 1 Conflict - Orange text `#FBBC05`
- Summary: "Client demo at 2pm - prep needed"

#### Prompts for AI Image Agent (3 separate generations)

```json
{
  "asset_name": "email_summary_card",
  "type": "data_overlay_card",
  "aspect_ratio": "1:1",
  "size": "1080x1080",
  "format": "PNG_with_transparency",

  "prompt": "Professional data summary card for video overlay, 800×600px centered on 1080×1080 canvas.

CARD STRUCTURE:
- Background: Dark gray (#1A1A1A), 10% opacity, rounded corners (12px radius)
- Border: 2px solid red (#EA4335)
- Padding: 40px all sides

HEADER:
'📧 EMAIL SUMMARY' - Red envelope icon OR Gmail multicolor icon, white text SF Pro Bold 32pt, red underline (2px) below header

STATS (4 lines, 20px spacing):
Line 1: '🚨 2 Urgent' - Red text (#EA4335) SF Pro Medium 24pt
Line 2: '⏰ 2 Action Items' - Yellow text (#FBBC05) SF Pro Medium 24pt
Line 3: 'ℹ️ 20 FYI' - Blue text (#4285F4) SF Pro Medium 24pt
Line 4: '🗑️ 38 Ignored' - Gray text (#808080) SF Pro Medium 24pt

SUMMARY TEXT:
'4 emails need your attention' - White (#FFFFFF) SF Pro Regular 20pt, 40px below stats

OPTIONAL: Subtle red glow around card (#EA4335 at 5% opacity, 20px blur radius)

STYLE: Clean, modern, minimal, high contrast, easily readable on video, professional data visualization, generous spacing, Gmail brand colors accurate.

TRANSPARENCY: Use transparency for background OR solid dark background - designer choice based on overlay needs.",

  "negative_prompt": "blurry text, illegible labels, poor contrast, busy backgrounds, decorative patterns, gradients inside card, 3D effects, shadows (except subtle glow), amateur design, crowded spacing, misaligned text, pixelated rendering, font artifacts, uneven borders",

  "brand_colors_critical": {
    "gmail_red": "#EA4335",
    "google_yellow": "#FBBC05",
    "google_blue": "#4285F4",
    "gray_neutral": "#808080",
    "text_white": "#FFFFFF"
  },

  "provider": "mcp__gpt-image-1__create_image"
}
```

```json
{
  "asset_name": "slack_catchup_card",
  "type": "data_overlay_card",
  "aspect_ratio": "1:1",
  "size": "1080x1080",

  "prompt": "Professional data summary card for video overlay, 800×600px centered on 1080×1080 canvas.

CARD STRUCTURE:
- Background: Dark gray (#1A1A1A), rounded corners (12px)
- Border: 2px solid aubergine (#4A154B)
- Padding: 40px all sides

HEADER:
'💬 SLACK CATCHUP' - Slack hashtag icon OR emoji, white text SF Pro Bold 32pt, aubergine underline (2px)

STATS (3 lines, 20px spacing):
Line 1: '📌 8 Mentions' - Aubergine text (#4A154B) SF Pro Medium 24pt
Line 2: '✅ 0 Urgent' - Green text (#34A853) SF Pro Medium 24pt
Line 3: '🔔 3 Discussions' - Slack blue text (#36C5F0) SF Pro Medium 24pt

SUMMARY TEXT:
'Catch up during 10am break' - White (#FFFFFF) SF Pro Regular 20pt

OPTIONAL: Subtle aubergine glow around card (#4A154B at 5% opacity)

STYLE: Clean, minimal, high contrast, Slack brand colors accurate, professional data card.",

  "negative_prompt": "blurry text, illegible labels, poor contrast, busy backgrounds, decorative elements, gradients, 3D effects, complex shadows, amateur design, crowded composition, misaligned elements, pixelated text",

  "brand_colors_critical": {
    "slack_aubergine": "#4A154B",
    "slack_blue": "#36C5F0",
    "success_green": "#34A853",
    "text_white": "#FFFFFF"
  },

  "provider": "mcp__gpt-image-1__create_image"
}
```

```json
{
  "asset_name": "calendar_briefing_card",
  "type": "data_overlay_card",
  "aspect_ratio": "1:1",
  "size": "1080x1080",

  "prompt": "Professional data summary card for video overlay, 800×600px centered on 1080×1080 canvas.

CARD STRUCTURE:
- Background: Dark gray (#1A1A1A), rounded corners (12px)
- Border: 2px solid blue (#4285F4)
- Padding: 40px all sides

HEADER:
'📅 TODAY'S SCHEDULE' - Calendar icon, white text SF Pro Bold 32pt, blue underline (2px)

STATS (3 lines, 20px spacing):
Line 1: '🕐 3 Meetings' - Blue text (#4285F4) SF Pro Medium 24pt
Line 2: '🧠 2 Focus Blocks' - Green text (#34A853) SF Pro Medium 24pt
Line 3: '⚠️ 1 Conflict' - Orange text (#FBBC05) SF Pro Medium 24pt

SUMMARY TEXT:
'Client demo at 2pm - prep needed' - White (#FFFFFF) SF Pro Regular 20pt

OPTIONAL: Subtle blue glow around card (#4285F4 at 5% opacity)

STYLE: Clean, minimal, Google Calendar brand colors accurate, professional data visualization.",

  "negative_prompt": "blurry text, illegible labels, poor contrast, decorative elements, busy patterns, gradients, 3D effects, amateur design, crowded spacing, misaligned text, pixelated rendering",

  "brand_colors_critical": {
    "google_calendar_blue": "#4285F4",
    "success_green": "#34A853",
    "warning_orange": "#FBBC05",
    "text_white": "#FFFFFF"
  },

  "provider": "mcp__gpt-image-1__create_image"
}
```

---

### ASSET 7: Reactive vs Proactive Comparison
**Type:** STATIC IMAGE (not video)
**Used At:** 21:15
**Duration Visible:** 15 seconds
**Aspect Ratio:** 16:9 (1920x1080px)

**Why Static:** Simple comparison chart. Two columns. No need for animation.

#### Visual Requirements

**Layout:**
```
┌──────────────────┬──────────────────┐
│  REACTIVE AI     │  PROACTIVE       │
│  (Old)           │  AGENTS (New)    │
│                  │                  │
│  ❌ You ask      │  ✅ Agent acts   │
│  ❌ It responds  │  ✅ Anticipates  │
│  ❌ You execute  │  ✅ It executes  │
└──────────────────┴──────────────────┘
```

**Structure:**
- Split screen: 50/50 vertical divide
- Left side: "REACTIVE AI" (red theme)
- Right side: "PROACTIVE AGENTS" (green theme)

**Left Column (Reactive):**
- Background: Dark red tint `rgba(234,67,53,0.1)`
- Header: "REACTIVE AI" (red text `#EA4335`, SF Pro Bold, 36pt)
- Subheader: "(Old)" (light gray #808080, 20pt)
- Items (3 lines):
  - ❌ You ask
  - ❌ It responds
  - ❌ You execute
  - Red X, white text, SF Pro Medium 22pt, 30px spacing

**Right Column (Proactive):**
- Background: Dark green tint `rgba(52,168,83,0.1)`
- Header: "PROACTIVE AGENTS" (green text `#34A853`, SF Pro Bold, 36pt)
- Subheader: "(New)" (light gray #808080, 20pt)
- Items (3 lines):
  - ✅ Agent acts
  - ✅ It anticipates
  - ✅ It executes
  - Green checkmark, white text, SF Pro Medium 22pt

**Divider:**
- Vertical line center: 2px solid white, 60% opacity
- Optional: VS symbol in circle at center (white, 60px diameter)

**Background:**
- Pure black `#000000`

**Canvas:**
- 1920x1080px
- Padding: 120px all sides

#### Prompt for AI Image Agent

```json
{
  "asset_name": "reactive_vs_proactive_comparison",
  "type": "comparison_chart",
  "aspect_ratio": "16:9",
  "size": "1920x1080",

  "prompt": "Clean split-screen comparison chart on pure black background (#000000), comparing Reactive AI (old) vs Proactive Agents (new).

LEFT COLUMN (50% width):
Header: 'REACTIVE AI' in red (#EA4335), SF Pro Bold 36pt
Subheader: '(Old)' in gray (#808080), SF Pro Regular 20pt
Background tint: Subtle dark red (rgba(234,67,53,0.1))
Items with red X symbols (❌):
  - '❌ You ask'
  - '❌ It responds'
  - '❌ You execute'
White text SF Pro Medium 22pt, 30px vertical spacing between items

RIGHT COLUMN (50% width):
Header: 'PROACTIVE AGENTS' in green (#34A853), SF Pro Bold 36pt
Subheader: '(New)' in gray (#808080), SF Pro Regular 20pt
Background tint: Subtle dark green (rgba(52,168,83,0.1))
Items with green checkmarks (✅):
  - '✅ Agent acts'
  - '✅ It anticipates'
  - '✅ It executes'
White text SF Pro Medium 22pt, 30px spacing

CENTER DIVIDER:
Vertical white line (2px solid, 60% opacity) separating columns
Optional: 'VS' in white circle (60px diameter) at vertical center of divider

STYLE: Minimal modern comparison, high contrast, clean typography, balanced composition, generous padding (120px all sides), professional tech aesthetic, flat design.

ALL TEXT: Perfectly sharp, high contrast, easily readable.",

  "negative_prompt": "blurry text, illegible labels, gradients (except specified subtle tints), 3D effects, complex shadows, decorative elements, busy patterns, poor contrast, uneven columns, misaligned text, amateur design, crowded spacing, pixelated rendering, font artifacts",

  "brand_colors_verified": {
    "reactive_red": "#EA4335",
    "proactive_green": "#34A853",
    "neutral_gray": "#808080",
    "text_white": "#FFFFFF",
    "background_black": "#000000"
  },

  "quality_requirements": {
    "clarity": "10/10 - Comparison instantly clear",
    "composition": "9/10 - Perfectly balanced columns",
    "color_accuracy": "10/10 - Exact red/green",
    "typography": "10/10 - Crisp, readable",
    "professionalism": "10/10"
  },

  "provider": "mcp__gpt-image-1__create_image"
}
```

---

### ASSET 8: Build Checklist Graphic
**Type:** STATIC IMAGE (not video)
**Used At:** 22:10-24:00
**Duration Visible:** 110 seconds (stays on screen entire build section)
**Aspect Ratio:** 9:16 (portrait, 1080x1920px) - Side overlay
**Format:** PNG, can be transparent

**Why Static:** Persistent checklist that viewers reference. Should stay readable throughout the build guide section.

#### Visual Requirements

**Layout:**
```
┌──────────────┐
│ BUILD GUIDE  │
│              │
│ 1. ☐ Claude  │
│              │
│ 2. ☐ MCP     │
│    Servers   │
│              │
│ 3. ☐ Master  │
│    Agent     │
│              │
│ 4. ☐ Skills  │
│              │
│ 5. ☐ Invoke  │
│    Agent     │
└──────────────┘
```

**Structure:**
- Card: 400×900px (portrait orientation for side overlay)
- Background: Dark gray `#1A1A1A` solid OR with 20% opacity
- Border: 3px solid `#C15F3C` (Claude orange)
- Corner radius: 12px
- Padding: 40px all sides

**Header:**
- "BUILD GUIDE"
- Orange text `#C15F3C`, SF Pro Bold 32pt
- Centered
- 20px padding below

**Checklist Items (5 steps):**
- Format: "{number}. ☐ {step_name}"
- Unchecked boxes: `☐` in white, 32pt
- Numbers: Orange `#C15F3C`, SF Pro Bold 28pt
- Text: White `#FFFFFF`, SF Pro Medium 24pt
- Spacing: 50px between items
- Alignment: Left-aligned within card

Items:
1. ☐ Install Claude Code
2. ☐ Install MCP Servers
3. ☐ Create Master Agent
4. ☐ Create Skills
5. ☐ Invoke Agent

**Optional Animation Note:**
- If video editor wants to animate: Checkboxes can be checked (☐→☑️) as you complete each step in narration
- But generate as static with unchecked boxes

**Background (outside card):**
- Transparent OR black

#### Prompt for AI Image Agent

```json
{
  "asset_name": "build_checklist_sidebar",
  "type": "checklist",
  "aspect_ratio": "portrait_custom",
  "size": "1080x1920",
  "note": "Portrait format for side overlay in video editor",

  "prompt": "Minimal modern checklist card for video side overlay, 400×900px centered on 1080×1920 portrait canvas.

CARD BACKGROUND:
Dark gray (#1A1A1A) solid, rounded corners (12px), orange border (#C15F3C, 3px solid), 40px padding all sides

HEADER:
'BUILD GUIDE' centered, orange text (#C15F3C), SF Pro Bold 32pt, 20px padding below

CHECKLIST (5 items, vertical, 50px spacing between):

1. Orange '1.' (#C15F3C) SF Pro Bold 28pt + White unchecked box '☐' 32pt + White text 'Install Claude Code' SF Pro Medium 24pt

2. Orange '2.' + White '☐' + White text 'Install MCP Servers' (wrapped to 2 lines if needed)

3. Orange '3.' + White '☐' + White text 'Create Master Agent'

4. Orange '4.' + White '☐' + White text 'Create Skills'

5. Orange '5.' + White '☐' + White text 'Invoke Agent'

ALIGNMENT: Left-aligned within card, numbers aligned, boxes aligned, text aligned

STYLE: Minimal, clean, professional, high contrast white text on dark background, generous spacing, easy to read on video overlay, Claude brand orange for accents.

TRANSPARENCY: Canvas outside card can be transparent (alpha channel) OR solid black background - both acceptable.

ALL TEXT: Perfectly crisp, high contrast, easily readable even when scaled down to 200-250px width in video.",

  "negative_prompt": "blurry text, illegible labels, poor contrast, busy background, decorative elements, gradients, 3D effects, checkmark symbols (use boxes only), complex shadows, amateur design, crowded spacing, misaligned items, uneven numbers, pixelated text, font rendering issues",

  "brand_colors_verified": {
    "claude_orange": "#C15F3C",
    "card_background": "#1A1A1A",
    "text_white": "#FFFFFF"
  },

  "quality_requirements": {
    "clarity": "10/10 - Checklist instantly readable",
    "typography": "10/10 - CRITICAL for small overlay",
    "color_accuracy": "10/10 - Claude orange exact",
    "composition": "9/10 - Clean vertical alignment",
    "professionalism": "10/10"
  },

  "provider": "mcp__gpt-image-1__create_image"
}
```

---

### ASSET 9: End Screen Template
**Type:** STATIC IMAGE (not video)
**Used At:** 24:45-25:00
**Duration Visible:** 15 seconds
**Aspect Ratio:** 16:9 (1920x1080px)

**Why Static:** YouTube end screen elements need to be static for clickable overlays. Animation not needed.

#### Visual Requirements

**Layout:**
```
┌─────────────────────────────────────────┐
│                                         │
│  [Subscribe]  [Next Video]  [Channel]  │
│     Button      Thumbnail      Icon    │
│                                         │
└─────────────────────────────────────────┘
```

**Structure:**
- Three zones: Left (subscribe), Center (next video), Right (channel)
- Each zone: 33% width

**Left Zone (Subscribe):**
- Large subscribe button
- Text: "SUBSCRIBE" (white, SF Pro Bold, 48pt)
- Subtext: "for more AI agent tutorials" (light gray #D4D4D4, 16pt)
- Background: Dark gray `#2A2A2A`, rounded (16px)
- Accent: Orange border `#C15F3C` 3px
- Icon: YouTube subscribe button style (optional)

**Center Zone (Next Video):**
- Placeholder for next video thumbnail
- Border: White 4px
- Text above: "NEXT VIDEO" (white, SF Pro Medium, 24pt)
- Background: Black

**Right Zone (Channel Icon):**
- Large circle (200px diameter)
- Background: Dark gray `#2A2A2A`
- Border: Orange `#C15F3C` 3px
- Text: "MORE VIDEOS" (white, SF Pro Bold, 20pt)
- Subtext: Channel name (light gray, 16pt)

**Background:**
- Black `#000000` OR dark blur (simulating video ending)

#### Prompt for AI Image Agent

```json
{
  "asset_name": "end_screen_template",
  "type": "youtube_end_screen",
  "aspect_ratio": "16:9",
  "size": "1920x1080",

  "prompt": "YouTube end screen template on black background (#000000), three-zone layout for clickable overlays.

LEFT ZONE (33% width):
Large subscribe button (500×250px), dark gray background (#2A2A2A), rounded corners (16px), orange border (#C15F3C, 3px):
- Main text: 'SUBSCRIBE' white (#FFFFFF) SF Pro Bold 48pt, centered
- Subtext: 'for more AI agent tutorials' light gray (#D4D4D4) SF Pro Regular 16pt, centered below
- Optional: Small YouTube play button icon

CENTER ZONE (33% width):
Video thumbnail placeholder (500×280px), white border (4px solid):
- Above: 'NEXT VIDEO' white SF Pro Medium 24pt
- Inside: Dark gray (#2A2A2A) placeholder OR sample thumbnail image

RIGHT ZONE (33% width):
Channel icon circular area (200px diameter), dark gray background (#2A2A2A), orange border (#C15F3C, 3px):
- Text: 'MORE VIDEOS' white SF Pro Bold 20pt, centered
- Below circle: Channel name in light gray (#D4D4D4) SF Pro Regular 16pt

SPACING: 60px padding between zones, 100px padding from canvas edges

STYLE: Clean YouTube end screen aesthetic, minimal modern design, high contrast, professional, clear calls to action, Claude brand orange for accents, dark theme, generous spacing.

ALL TEXT: Crisp, perfectly readable, high contrast.",

  "negative_prompt": "blurry text, illegible labels, busy background, decorative patterns, gradients, 3D effects, complex shadows, amateur design, crowded layout, poor contrast, misaligned elements, uneven spacing, pixelated rendering, low quality",

  "brand_colors_verified": {
    "claude_orange": "#C15F3C",
    "background_grays": ["#000000", "#2A2A2A"],
    "text_white": "#FFFFFF",
    "text_gray": "#D4D4D4"
  },

  "quality_requirements": {
    "clarity": "10/10 - Clear CTAs",
    "composition": "9/10 - Balanced three zones",
    "color_accuracy": "10/10 - Claude orange exact",
    "typography": "10/10 - All text readable",
    "professionalism": "10/10"
  },

  "provider": "mcp__gpt-image-1__create_image"
}
```

---

## Assets That Should NOT Be Generated (Real Footage Only)

### Why Some Assets Need Real Footage

**Terminal Screen Recordings:**
- Real Homebrew installation output (can't fake this convincingly)
- Actual Claude Code authentication flow (needs to show real browser)
- MCP server npm install outputs (viewers expect real terminals)
- Morning briefing execution (must show real agent responses)

**Application Interfaces:**
- Gmail inbox with actual emails (can't fake 47 unread convincingly with AI)
- Slack with real workspace names and channels
- Google Calendar with actual meeting names
- Finder with actual file names in PARA folders

**You Talking:**
- All talking head segments (AI can't generate you yet)
- Morning routine scene (you with coffee, authentic moment)
- Reactions to automation working (genuine expressions matter)

**Why Real > AI for These:**
- Authenticity: Viewers can tell fake terminal output
- Credibility: Real tools build trust
- Detail: Real interfaces have UI elements AI can't replicate perfectly
- Emotion: Your genuine reactions can't be faked

---

## Video Assets (Animated) - Only If They Add Value

### Potentially Worth Animating:

**1. MCP Architecture Diagram - Connection Animation**
**Type:** ANIMATED (if clean)
**Duration:** 15 seconds, loops 3-4 times during 4:00-8:00 section

**Animation Sequence:**
- Start: All nodes visible but dim
- Step 1 (0-3s): Claude Code node lights up (pulses orange)
- Step 2 (3-6s): Lines extend from center to each MCP (sequentially)
- Step 3 (6-9s): Each MCP node lights up as line connects (uses brand color)
- Step 4 (9-12s): Lines extend from MCPs to systems
- Step 5 (12-15s): Full system glows, holds for 2s
- Loop back OR hold on final state

**Value:** Shows the connection sequence, helps viewers understand how components link together.

**Risk:** If animation is choppy or unclear, use static diagram instead.

**Decision:** ONLY generate animated version if AI video tool can create smooth, professional motion graphics. Test with 5-second sample first.

---

**2. Data Flow Visualization - Morning Routine**
**Type:** ANIMATED (if clean and adds clarity)
**Duration:** 30 seconds, shows during 18:40-20:00

**Animation Sequence:**
- Show email/slack/calendar icons
- Data particles flow from icons → MCP servers → Agent → User
- Text summaries appear progressively
- All three flows happen in parallel

**Value:** Visualizes the "data flow" concept, makes abstract process tangible.

**Risk:** Can become cluttered or confusing if not executed perfectly.

**Decision:** LOW PRIORITY. Static diagrams work fine. Only attempt if you have extra time and AI video tool produces clean results.

---

## Video Assets: Don't Bother Generating

**What NOT to use AI video for:**

❌ **Talking head B-roll** - AI can't generate you convincingly yet
❌ **Terminal typing animations** - Real screen recordings are easier and more authentic
❌ **Application interface walkthroughs** - Real apps look real, AI apps look fake
❌ **Code file scrolling** - Real VS Code is trivial to record
❌ **Coffee pouring / workspace shots** - 30 seconds of filming beats hours of AI prompting
❌ **Mouse cursor movements** - Viewers expect real UI interaction

**Why:**
- AI video is expensive (credits/cost)
- Quality inconsistent for UI/photorealistic needs
- Real footage is faster to capture and more authentic
- Viewers can tell when interfaces are AI-generated (uncanny valley)

---

## Recommended Generation Order

### Priority 1: Core Diagrams (Generate First)
1. **MCP Architecture Diagram** (ASSET 1) - Used multiple times, foundation visual
2. **Agent Architecture Diagram** (ASSET 3) - Core concept, critical for understanding
3. **Build Checklist** (ASSET 8) - Stays on screen 110 seconds, high visibility

### Priority 2: Data Overlays (Generate Second)
4. **Email Summary Card** (ASSET 6a)
5. **Slack Catchup Card** (ASSET 6b)
6. **Calendar Briefing Card** (ASSET 6c)

### Priority 3: Supporting Graphics (Generate Third)
7. **Permission Boundaries** (ASSET 2) - Nice to have, but can describe verbally
8. **File Structure Tree** (ASSET 4) - Can show in real VS Code if needed
9. **Reactive vs Proactive** (ASSET 7) - Simple, quick to generate
10. **End Screen Template** (ASSET 9) - Can use default YouTube end screen if pressed for time

### Optional: Test Animation (Only If Time Permits)
11. **MCP Architecture Animation** - Test 5-second sample, only proceed if quality is exceptional

---

## Technical Specifications for AI Image Agent

### Required Parameters for All Generations

**Aspect Ratio Validation:**
- YouTube overlays: 16:9 → Use `1536x1024` (OpenAI) or `1920x1080` (if supported)
- Side overlays: 9:16 → Use `1024x1536` (OpenAI)
- Square data cards: 1:1 → Use `1024x1024` (OpenAI)

**Quality Settings:**
- Always use `"quality": "high"` for OpenAI
- Never use `"quality": "hd"` (not supported)
- Set `n: 1` (one image per generation for precision)

**Output Format:**
- PNG preferred (lossless, transparency support)
- JPEG acceptable for photos/backgrounds (smaller file size)
- Save at original resolution (don't downscale)

**Naming Convention:**
```
{asset_name}_{version}.png
Example: mcp_architecture_diagram_v1.png
```

**Metadata (Save with Every Asset):**
```json
{
  "asset_name": "...",
  "prompt_used": "...",
  "negative_prompt": "...",
  "brand_colors_used": {...},
  "size": "1920x1080",
  "quality": "high",
  "provider": "mcp__gpt-image-1__create_image",
  "generated_at": "2025-10-28T...",
  "quality_score": {
    "clarity": 0,
    "technical_quality": 0,
    "composition": 0,
    "color_accuracy": 0,
    "typography": 0,
    "professionalism": 0,
    "prompt_accuracy": 0,
    "overall": 0
  },
  "approved_for_production": false,
  "notes": "..."
}
```

---

## Quality Control Checklist (For Each Asset)

### Before Approving Any Asset, Verify:

**Color Accuracy:**
- [ ] All brand colors match EXACT hex codes from this document
- [ ] Claude orange is `#C15F3C` (not `#C16040` or similar)
- [ ] Gmail red is `#EA4335` (not `#E94234` or similar)
- [ ] Slack aubergine is `#4A154B` (not `#4B164C` or similar)
- [ ] GitHub blue is `#4078C0` (not `#3F79C1` or similar)
- [ ] No color drift or approximations

**Typography:**
- [ ] All text is crisp and sharp (no blurry rendering)
- [ ] Font sizes appropriate (min 14pt, titles 32pt+)
- [ ] High contrast (white on dark minimum 15:1 ratio)
- [ ] Line spacing adequate (1.3-1.5x minimum)
- [ ] No spelling errors in labels

**Composition:**
- [ ] Generous negative space (40-60% of canvas)
- [ ] Elements properly aligned
- [ ] Balanced visual weight
- [ ] Nothing feels cramped or crowded
- [ ] Professional, not amateur

**Brand Integrity:**
- [ ] Logos used correctly (if included)
- [ ] Colors are official brand colors
- [ ] No brand guideline violations
- [ ] Professional representation of all tools

**Technical Quality:**
- [ ] No artifacts, banding, or compression issues
- [ ] Sharp edges and clean lines
- [ ] Proper resolution (1920×1080 minimum)
- [ ] Format appropriate (PNG for diagrams, JPEG for photos)

### Approval Threshold

**Minimum Score:** 8.5/10 overall (Emily's quality standard)

**If Score < 8.5:**
- Identify which pillar failed
- Regenerate with refined prompt
- Adjust negative prompts to avoid specific issues
- Consider alternative provider if quality persists

**If Score ≥ 9.0:**
- Save prompt as template for future use
- Mark as "gold standard" example
- Can be used immediately in production

---

## Provider Selection Guide for This Project

### Use OpenAI (mcp__gpt-image-1__create_image) For:
✅ All diagrams (MCP architecture, agent architecture, file tree)
✅ All data cards (email, slack, calendar summaries)
✅ Text-heavy graphics (build checklist, comparison chart)
✅ Professional compositions with multiple elements

**Why:** Superior text rendering, better composition with multiple objects, more reliable with technical diagrams.

### Use Gemini (mcp__nanobanana__generate_image) For:
- Photo-realistic scenes (if needed for B-roll)
- Image editing (if refining generated assets)
- Fast iterations during testing

**Why:** Faster generation, better for photorealistic content, excellent for editing.

### For This YouTube Video Specifically:
**Recommended:** 100% OpenAI (gpt-image-1)
- All assets are diagrams and text-heavy graphics
- Text rendering quality is critical
- Professional appearance required
- Brand color accuracy essential

**Cost Estimate:**
- 8 static images × ~$0.04-0.08 each = $0.32-0.64 total
- 1-2 animation tests (if attempted) × $0.10-0.20 = $0.10-0.40
- **Total: $0.42-1.04** (very reasonable for 8 production-ready assets)

---

## Final Notes for AI Image Agent

### Generation Session Workflow:

1. **Load this specification document** (you're reading it)
2. **Generate in priority order** (start with Priority 1 assets)
3. **Save each asset with metadata JSON** (mandatory for tracking)
4. **Show preview to sid** (get approval before moving to next)
5. **Score with 7-pillar system** (document quality for each asset)
6. **Iterate if score < 8.5** (regenerate with refined prompts)
7. **Mark approved assets** (ready for video production)

### Communication Style:

When generating, tell sid:
- "Generating MCP Architecture Diagram... est. 90 seconds"
- "✅ Complete! Quality score: 9.2/10 (Excellent)"
- "Brand colors verified: Claude orange #C15F3C ✓"
- "Ready for next asset?"

Be efficient. Show progress. Confirm quality. Keep moving.

### If Issues Arise:

**Color drift detected:**
- Regenerate with EXACT hex codes emphasized
- Add to negative prompt: "color inaccuracy, wrong brand colors"
- Try alternative provider if persists

**Text illegible:**
- Increase font sizes by 20%
- Simplify composition (fewer elements)
- Use higher contrast (pure white on pure black)

**Composition cluttered:**
- Increase negative space (reduce element count)
- Make elements smaller
- Add more padding

**Brand guidelines violated:**
- Double-check brand colors in this document
- Verify logo usage is appropriate
- Regenerate with corrected specifications

---

## Brand Color Quick Reference Card

**Copy/Paste for Prompts:**

```
VERIFIED BRAND COLORS (Hex Codes):
- Claude (Anthropic): #C15F3C (orange)
- Homebrew: #F3CB73 (tan/gold)
- Raycast: #FF6363 (red)
- GitHub: #4078C0 (blue)
- Gmail: #EA4335 (red)
- Google Calendar: #4285F4 (blue)
- Slack: #4A154B (aubergine) + #36C5F0 (blue)
- VS Code: #0078D7 (blue)
- Node.js: #339933 (green)
- Docker: #0DB7ED (cyan blue)
- Notion: #000000 (black), #FFFFFF (white)

NEUTRAL COLORS:
- Background: #000000 (black) or #1A1A1A (charcoal)
- Dark grays: #2A2A2A, #404040, #606060, #808080
- Text white: #FFFFFF
- Text gray: #D4D4D4
- Success green: #34A853
- Warning yellow: #FBBC05
```

---

## Output Location

**Save all generated assets to:**
```
/Users/sid/Desktop/4. Coding Projects/social-media-manager/outputs/10-28-2025/youtube-mac-setup-research/assets/

Structure:
assets/
├── diagrams/
│   ├── mcp_architecture_diagram_v1.png
│   ├── mcp_architecture_diagram_v1_metadata.json
│   ├── agent_architecture_hierarchical_v1.png
│   ├── agent_architecture_hierarchical_v1_metadata.json
│   └── ...
├── overlays/
│   ├── email_summary_card_v1.png
│   ├── slack_catchup_card_v1.png
│   ├── calendar_briefing_card_v1.png
│   └── build_checklist_sidebar_v1.png
├── comparisons/
│   └── reactive_vs_proactive_comparison_v1.png
├── end_screens/
│   └── end_screen_template_v1.png
└── GENERATION_SUMMARY.md (created after all assets complete)
```

---

## Success Criteria

### Each Asset Must:
✅ Use EXACT hex codes from brand color research
✅ Score ≥ 8.5/10 on Emily's 7-pillar system
✅ Be crisp and sharp (no blurry text or elements)
✅ Follow minimal modern aesthetic (no clutter)
✅ Have accompanying metadata JSON
✅ Be production-ready (no further editing needed)

### Complete Set Must:
✅ Visual consistency across all 8+ assets
✅ Brand color accuracy maintained throughout
✅ Professional enterprise-grade appearance
✅ Ready for video editor to drop into timeline
✅ Total cost < $1.50 (budget-conscious)

---

**Document Complete. Ready for AI Image Agent Execution.**

**Total Assets:** 8-9 static images, 0-1 animated (if quality permits)
**Estimated Generation Time:** 60-90 minutes (including reviews and iterations)
**Estimated Cost:** $0.42-1.04 (very reasonable for production quality)
**All Brand Colors:** Researched and verified with sources
**Design System:** Minimal modern tech, professional, high contrast