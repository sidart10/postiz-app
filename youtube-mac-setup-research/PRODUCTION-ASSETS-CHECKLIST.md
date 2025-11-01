# Production Assets Checklist: AI Agents Run My Mac (25-min YouTube Video)

**Video:** How AI Agents Run My Mac
**Duration:** 25 minutes
**Complexity:** Medium-High
**Based on:** YouTube Best Practices (85% retention tactics, 50-60% surprise rule, pattern interrupts)

---

## 🎬 PRE-PRODUCTION (Do Before Filming)

### 1. Script Review ✓
- [x] Script finalized (25 min timing)
- [ ] Read through 2-3 times (get comfortable)
- [ ] Mark sections to memorize vs reference
- [ ] Identify ad-lib opportunities

### 2. Technical Setup Tests
- [ ] Test screen recording software (CleanShot X at 1080p minimum)
- [ ] Test terminal recording (readable text size at 1080p)
- [ ] Verify Claude Code + all MCP servers working
- [ ] Test automation sequences (run through once before filming)
- [ ] Check external mic levels (clear audio, no background noise)

### 3. Workspace Preparation
- [ ] Clean desk (visible in talking head shots)
- [ ] Remove personal info from desktop/browser
- [ ] Close unnecessary apps (clean menu bar for demos)
- [ ] Prepare coffee cup (prop for morning routine scene)
- [ ] Lighting test (face well-lit, no shadows)

### 4. File Preparation (Create Placeholder Files)
- [ ] `.claude/agents/mac-master-agent.md` (full agent definition)
- [ ] `.claude/skills/email-summary.md` (skill file)
- [ ] `.claude/skills/slack-catchup.md` (skill file)
- [ ] `.claude/skills/calendar-briefing.md` (skill file)
- [ ] `.claude/skills/file-organizer.md` (skill file)
- [ ] `~/.config/claude/mcp-config.json` (MCP permissions)
- [ ] Create GitHub Gist with all prompts (link in description)

---

## 📹 FILMING ASSETS NEEDED

### A. Talking Head Footage (~8 minutes of raw footage)

**Scenes to film:**

**Scene 1: Hook (0:00-0:05)**
- [ ] Direct to camera, confident expression
- [ ] Delivery: "ai agents installed my apps, organized my files, and handle my morning routine. this is what agentic AI actually looks like."
- [ ] 2-3 takes (test delivery variations)

**Scene 2: Intro (0:05-2:00)**
- [ ] Explaining the vision (casual, building excitement)
- [ ] Gestures: Open, inviting (not stiff)
- [ ] 2-3 takes for energy variation

**Scene 3: Teaching Segments (scattered throughout)**
- [ ] Explaining MCP servers (4:00-4:45) - use simple gestures
- [ ] Explaining agent architecture (12:00-13:00) - clear, methodical
- [ ] Philosophical close (21:00-22:00) - forward-looking tone

**Scene 4: Morning Routine (18:00-18:20)**
- [ ] At desk with coffee, calm morning vibe
- [ ] Typing "morning briefing" command
- [ ] Reading the output, satisfied expression

**Scene 5: CTA (24:00-25:00)**
- [ ] Friendly, inviting close
- [ ] Pointing to subscribe button (gesture)
- [ ] Final thought: "let's build it" (energetic)

**Filming Tips (from best practices):**
- Film all talking head in ONE session (consistent lighting)
- Multiple takes per section (choose best in edit)
- Vary energy slightly (editor can pick best pacing)
- Look directly at camera lens (eye contact with viewer)

---

### B. Screen Recordings (~15 minutes of raw footage)

**Priority Screen Recordings (MUST HAVE):**

**SR-1: Claude Code Installation (2:00-4:00)**
- [ ] Clean terminal (readable theme, zoomed text)
- [ ] Commands:
  - `brew install node`
  - `npm install -g @anthropic-ai/claude-code`
  - `claude` (authentication flow)
- [ ] Browser window showing Anthropic login (PIP)
- [ ] Success confirmation

**SR-2: MCP Server Installations (4:00-8:00)**
- [ ] Terminal showing each MCP install:
  ```bash
  npm install -g @modelcontextprotocol/server-filesystem
  npm install -g @modelcontextprotocol/server-chrome-devtools
  npm install -g @modelcontextprotocol/server-github
  ```
- [ ] Config file being edited (`~/.config/claude/mcp-config.json`)
- [ ] Verification (MCPs loaded successfully)

**SR-3: App Installation (8:00-10:00)**
- [ ] Claude Code prompt for app installation
- [ ] Homebrew progress bars (can speed up 2x in edit)
- [ ] 3-5 apps installing (representative sample)
- [ ] Applications folder showing installed apps

**SR-4: PARA Folder Creation (10:00-12:00)**
- [ ] Claude Code prompt for PARA structure
- [ ] Finder window showing folders being created
- [ ] Final organized directory tree

**SR-5: Agent File Creation (12:00-16:00)**
- [ ] Creating `.claude/agents/mac-master-agent.md` in VS Code
- [ ] Show file contents (role, skills, mcp servers)
- [ ] Creating skills directory
- [ ] Creating 2-3 skill files (email-summary, slack-catchup)
- [ ] Scroll through skill structure

**SR-6: Morning Routine Demo (18:00-21:00)** ⭐ CRITICAL
- [ ] Terminal: Type "morning briefing" command
- [ ] Agent orchestrating skills (output appearing)
- [ ] Email summary generating
- [ ] Slack summary generating
- [ ] Calendar briefing generating
- [ ] Final formatted output (3-skill summary)

**SR-7: Config Files & GitHub**
- [ ] MCP config.json structure
- [ ] GitHub Gist with prompts
- [ ] Agent + skills repo structure

**Recording Settings:**
- Resolution: 1080p minimum (4K if possible)
- Frame rate: 30fps minimum
- Terminal: Large font (16-18pt), high contrast theme
- No desktop clutter (clean, professional)

---

### C. B-Roll Footage (~10 minutes of footage)

**Category 1: Manual Setup Pain (for contrast) - 2 min**
- [ ] Clicking through App Store
- [ ] Downloading DMG files from websites
- [ ] Dragging apps to Applications folder
- [ ] System permission dialogs (repetitive, tedious feeling)
- [ ] Scrolling through long email inbox (overwhelmed feeling)

**Category 2: Apps Working - 3 min**
- [ ] Raycast launching an app (quick demo)
- [ ] Rectangle snapping windows
- [ ] Bartender hiding menu bar items
- [ ] CleanShot X taking screenshot with annotation
- [ ] Arc browser showing Spaces feature
- [ ] Stats displaying system metrics in menu bar

**Category 3: File Organization - 1 min**
- [ ] Finder showing PARA folders structure
- [ ] Files being moved (drag and drop)
- [ ] Organized vs messy Downloads folder (before/after)

**Category 4: Morning Routine Context - 2 min**
- [ ] Coffee being made (morning vibe)
- [ ] Walking to desk with coffee
- [ ] Gmail inbox with 47 unread (overwhelming)
- [ ] Slack with notification badges (multiple workspaces)
- [ ] Google Calendar packed with meetings
- [ ] You reading AI summary calmly (in control vs overwhelmed)

**Category 5: Agent Working - 2 min**
- [ ] Terminal with agent outputs (multiple summaries)
- [ ] Chrome browser being controlled by AI
- [ ] GitHub interface with Claude Code interaction
- [ ] Files organizing automatically (timelapse?)

**B-Roll Shooting Tips:**
- Shoot at 60fps (can slow down in edit for dramatic effect)
- Clean framing (no clutter)
- Each clip: 10-15 seconds minimum (gives editor options)
- Natural lighting (consistent with talking head)

---

## 🎨 GRAPHICS & TEXT OVERLAYS (~25 assets)

### Graphics to Create (Before Editing)

**G-1: Hook Text Overlay**
- Text: "AI AGENTS RUN MY MAC"
- Style: Bold, lowercase, high contrast
- Format: PNG with transparency, 1920x1080
- When: 0:01-0:04

**G-2: PARA Explanation Diagram**
- Visual: 4 folders with labels
  - 1.Projects (active work)
  - 2.Sid (personal)
  - 3.Resources (reference)
  - 4.Archive (completed)
- Style: Clean, Mac aesthetic
- When: 10:00-10:30

**G-3: MCP Servers Architecture Diagram**
- Visual: Claude Code (center) with arrows to:
  - Filesystem MCP
  - Chrome DevTools MCP
  - GitHub MCP
  - Gmail MCP
  - Slack MCP
- Style: Tech blueprint aesthetic
- When: 5:00-5:30

**G-4: Agent Architecture Diagram**
- Visual: Hierarchy showing:
  ```
  Mac Master Agent
  ├── email-summary skill → Gmail MCP
  ├── slack-catchup skill → Slack MCP
  ├── calendar-briefing skill → Calendar MCP
  ├── file-organizer skill → Filesystem MCP
  └── app-installer skill → Homebrew
  ```
- Style: Flowchart, clean lines
- When: 13:00-13:30

**G-5: Time Comparison Graphic**
- Visual: Bar graph or side-by-side
  - Manual: 30 minutes
  - AI Agents: 3 minutes
  - Savings: 90%
- Style: Bold numbers, visual contrast
- When: 20:30-20:45

**G-6: Email Summary Example (Formatted)**
- Show: The email summary output prettified
- Categories: URGENT, ACTION ITEMS, FYI, IGNORED
- Color-coded by priority (red, yellow, blue, gray)
- When: 19:00-19:20

**G-7: Chapter Title Cards (7 cards)**
Create animated title card for each major section:
- "INSTALLING CLAUDE CODE"
- "INSTALLING MCP SERVERS"
- "AUTOMATED APP INSTALLATION"
- "PARA FILE SYSTEM"
- "BUILDING THE AGENT"
- "MORNING ROUTINE DEMO"
- "THE VISION"

Style: Bold text, 2-second display, smooth fade in/out
When: Start of each section (transition markers)

---

### Text Overlays (Create in editing software)

**Command Overlays (10-12 needed):**
- Format: Monospace font, code block style
- Background: Dark with slight transparency
- Text: White/green (terminal aesthetic)
- Examples:
  - `npm install -g @anthropic-ai/claude-code`
  - `npm install -g @modelcontextprotocol/server-filesystem`
  - `morning briefing`

**Callout Text (8-10 needed):**
- Format: Sans-serif, bold, large
- Style: High contrast, easy to read
- Examples:
  - "MCP = MODEL CONTEXT PROTOCOL"
  - "ONE AGENT + MODULAR SKILLS"
  - "30 MIN → 3 MIN"
  - "✓ 13 APPS INSTALLED"

**Progress Indicators:**
- Checklist animations (items checking off)
- Progress counters (1/5, 2/5, etc.)
- Timer overlays (for time comparisons)

---

## 🎵 AUDIO ASSETS

### Music Tracks Needed (2-3 tracks)

**Track 1: Intro/Background (0:30-25:00)**
- Style: Upbeat, tech-focused, non-distracting
- Tempo: 100-120 BPM
- Mood: Modern, optimistic, productive
- Sources: YouTube Audio Library ("Technology" category), Epidemic Sound, Artlist
- Usage: Background throughout (15-25% volume when you're talking)

**Track 2: Montage/B-roll (optional)**
- Style: Slightly more energetic for visual sequences
- Tempo: 120-130 BPM
- Usage: App installation montages, file organization sequences

**Track 3: Outro (24:00-25:00)**
- Style: Inspirational, forward-looking
- Tempo: Similar to Track 1 but builds to finish
- Usage: Final CTA and vision section

**Audio Levels:**
- Voice: -6dB to -3dB (primary)
- Music: -25dB to -20dB (background)
- System sounds (terminal): -15dB to -12dB (audible but not distracting)

### Voiceover/Recording

**Equipment:**
- External mic recommended (Blue Yeti, Rode, Shure)
- Backup: AirPods Pro in quiet room
- Avoid: Built-in Mac mic

**Recording tips:**
- Record in quiet space (no background noise)
- Close windows (no traffic/outdoor sounds)
- Turn off HVAC/fans during recording
- Record room tone (30 sec silence for noise reduction)

---

## 📱 RETENTION-SPECIFIC ASSETS (From Best Practices)

### Pattern Interrupt Elements (Every 45-60 seconds)

**Based on your script timing:**
- 0:45: Quick montage (apps/files/email) - VISUAL break
- 2:30: Terminal appears (switch from talking head) - FORMAT break
- 4:45: MCP diagram animation - GRAPHIC break
- 6:30: Config file view - CONTENT break
- 9:00: Split screen (terminal + Applications folder) - LAYOUT break
- 12:00: Agent file creation - NEW TOPIC break
- 15:00: B-roll montage (coffee making) - LIFESTYLE break
- 18:30: Morning briefing demo - PAYOFF break
- 21:30: Philosophical vision - TONE break
- 24:00: GitHub Gist screenshot - ACTIONABLE break

**Asset needed:** Variety in visuals (talking head, terminal, graphics, B-roll, split-screen)

### 50-60% Surprise Element (12-15 min mark)

**Your script placement:** Morning routine agent demo (18:00)

**Why this works:**
- Most surprising part (AI briefing you while you make coffee)
- Emotional payoff (viewers see real time savings)
- Re-engages viewers considering dropping off

**Asset needed:**
- Coffee-making B-roll (cinematic, satisfying)
- Real AI summaries generating (not fake/rushed)
- Your genuine reaction (this actually works)

### Hook Engineering (0:00-0:30)

**From best practices: "85% lose 50% of viewers in first 30s"**

**Your hook strategy:**
- 0:00-0:05: Bold claim (lowercase, direct)
- 0:05-0:30: Quick proof (montage of automation working)

**Assets needed:**
- Strong hook delivery (2-3 takes, pick best)
- Fast-paced montage footage (apps, files, summaries - quick cuts)
- Energy in delivery (confident, matter-of-fact)

---

## 🖼️ THUMBNAIL ASSETS

### Option 1: Agent Architecture (RECOMMENDED)

**Elements needed:**
- Screenshot: Mac screen showing terminal with agent output
- Diagram overlay: Master agent + skills visualization
- Your photo: Excited/confident expression (portrait mode)
- Text: "ONE AI AGENT RUNS MY MAC"
- Background: Mac aesthetic (silver/space gray gradient)

**To create:**
1. Screenshot your terminal with agent running (clean, readable)
2. Take portrait photo (good lighting, excited expression)
3. Create in Canva:
   - Background: Gradient or blurred Mac desktop
   - Left 40%: Your photo (cut out background)
   - Right 60%: Terminal screenshot + architecture diagram overlay
   - Text: Bold, high contrast ("ONE AI AGENT RUNS MY MAC")

### Option 2: Morning Routine

**Elements:**
- Photo: Coffee cup + Mac
- Screenshot: Email/Slack/Calendar summaries from AI
- Text: "AI READS MY EMAIL WHILE I MAKE COFFEE"

### Option 3: Time Savings

**Elements:**
- Split comparison visual
- Left: Manual setup (frustrated expression)
- Right: You relaxed (AI working)
- Text: "30 MIN → 3 MIN" (large)

**Thumbnail specs:**
- Size: 1280x720 pixels
- Format: JPG or PNG
- File size: Under 2MB
- Text: Readable at small sizes (mobile test)

---

## 📊 POST-PRODUCTION CHECKLIST

### 1. Editing Assets Organization

**Project Structure (in editor):**
```
MacAgentVideo/
├── Raw Footage/
│   ├── Talking Head/
│   ├── Screen Recordings/
│   └── B-roll/
├── Graphics/
│   ├── Diagrams/
│   ├── Text Overlays/
│   └── Chapter Cards/
├── Audio/
│   ├── Voice (cleaned)/
│   ├── Music/
│   └── SFX/
└── Export/
```

### 2. Editing Sequence (Recommended Order)

**Phase 1: Rough Cut (3-4 hours)**
- [ ] Import all footage
- [ ] Arrange talking head sections per script
- [ ] Insert screen recordings at correct timestamps
- [ ] Basic cuts (remove dead air, mistakes)
- [ ] Check total runtime (~25 min)

**Phase 2: B-Roll Integration (2 hours)**
- [ ] Insert B-roll over talking head (keep voice)
- [ ] App demos during mentions
- [ ] Morning routine coffee footage
- [ ] Manual vs AI comparison shots
- [ ] Smooth transitions between clips

**Phase 3: Graphics & Text (2-3 hours)**
- [ ] Add all text overlays (commands, callouts)
- [ ] Insert diagrams (MCP, agent architecture)
- [ ] Chapter title cards (section transitions)
- [ ] Progress indicators (checklists, counters)
- [ ] Thumbnail test frames (preview at 0:01)

**Phase 4: Audio Mix (1-2 hours)**
- [ ] Clean voice audio (noise reduction, EQ)
- [ ] Add background music (starts 0:30)
- [ ] Balance levels (voice primary, music 20%)
- [ ] Sync system audio from screen recordings
- [ ] Smooth music transitions

**Phase 5: Color Grade (1 hour)**
- [ ] Match talking head with screen recordings (color consistency)
- [ ] Slight contrast boost (pop visuals)
- [ ] Skin tone correction (natural, not orange)
- [ ] Terminal: Ensure text readable (contrast check)

**Phase 6: Retention Optimization (1 hour)**
- [ ] Add pattern interrupts every 45-60s (per best practices)
- [ ] Verify 50-60% surprise (morning routine at 18:00)
- [ ] Check pacing (no dead spots, varied energy)
- [ ] Test first 30 seconds (critical retention window)

**Phase 7: Final Review**
- [ ] Watch full video (note any issues)
- [ ] Check audio sync (no drift)
- [ ] Verify text overlays readable
- [ ] Test on phone (mobile viewing experience)
- [ ] Confirm CTAs clear (GitHub Gist link, subscribe)

**Total Editing Time:** 10-14 hours

---

## 💾 FILES TO CREATE (Placeholders for Demo)

### Agent Definition File

**File:** `.claude/agents/mac-master-agent.md`

**Content:**
```markdown
# Mac Master Agent

## Role
I manage your Mac and daily operations. I have access to your filesystem, browser, GitHub, email, and Slack through MCP servers. I can install software, organize files, and provide morning briefings.

## Available Skills

### email-summary
Reads Gmail inbox, categorizes by urgency, flags action items

### slack-catchup
Summarizes Slack mentions and DMs, identifies urgent threads

### calendar-briefing
Reviews calendar, identifies conflicts, calculates focus time

### file-organizer
Organizes downloads into PARA system, maintains folder structure

### app-installer
Installs software via Homebrew, handles dependencies

## MCP Servers Available
- @modelcontextprotocol/server-filesystem (~/1.Projects, ~/2.Sid, ~/3.Resources, ~/4.Archive, ~/Downloads)
- @modelcontextprotocol/server-chrome-devtools
- @modelcontextprotocol/server-github
- @custom/gmail-mcp (readonly)
- @custom/slack-mcp (readonly)

## Example Invocations

**Morning briefing:**
```
morning briefing
```
Executes: email-summary + slack-catchup + calendar-briefing

**Organize files:**
```
organize my downloads folder
```
Executes: file-organizer skill

**Install app:**
```
install raycast and rectangle
```
Executes: app-installer skill
```

---

### Skill Files (Create 3-4 for demo)

**File 1:** `.claude/skills/email-summary.md`

```markdown
# Email Summary Skill

## Purpose
Read Gmail inbox and provide actionable summary

## MCP Servers Used
- gmail-mcp (readonly)

## Instructions
1. Fetch unread emails from last 12 hours
2. Categorize each:
   - Client emails (high priority)
   - Team emails (medium priority)
   - Automated notifications (ignore)
   - Newsletters (ignore)
3. For client and team emails:
   - Extract sender, subject, key points
   - Identify if response needed
   - Flag urgency
4. Output structured summary

## Example Output
```
Email Summary (Last 12 Hours):

URGENT (Response Today):
1. Client: API integration - @john
2. Team: Deployment schedule - @sarah

ACTION ITEMS (This Week):
3. PR review request
4. Meeting reschedule

FYI:
- 12 team updates
- 8 GitHub notifications

IGNORED: 23 newsletters, 15 automated

Total: 47 emails, 4 need attention
```
```

**File 2:** `.claude/skills/slack-catchup.md`

```markdown
# Slack Catchup Skill

## Purpose
Summarize Slack activity and flag important items

## MCP Servers Used
- slack-mcp (readonly)

## Instructions
1. Check all workspaces for mentions and DMs
2. Categorize by channel and priority
3. Identify urgent threads
4. Output summary with action items

## Example Output
```
Slack Summary:

MENTIONS (8 total):
- #engineering: Deployment discussion (3 mentions)
- #product: Feature priority (2 mentions)
- DM: Manager feedback (positive)

URGENT: None
CATCH UP: 10am break suggested

Top channels: #engineering, #product, #general
```
```

**File 3:** `.claude/skills/calendar-briefing.md`

```markdown
# Calendar Briefing Skill

## Purpose
Review calendar and identify optimization opportunities

## MCP Servers Used
- google-calendar-mcp (readonly)

## Instructions
1. Load today's events
2. Calculate prep time needed
3. Identify conflicts
4. Calculate focus time blocks
5. Output briefing with recommendations

## Example Output
```
Calendar Briefing:

MEETINGS TODAY:
- 10am: Team standup (15 min)
- 2pm: Client demo (1 hour)
  ⚠️ PREP: Review slides in Drive
- 4pm: 1-on-1 Sarah (30 min)

FOCUS TIME:
- 8-10am (NOW - 2 hours)
- 12-2pm (2 hours)

CONFLICTS:
⚠️ Client demo overlaps lunch
   Suggest: Move lunch to 1pm

Total meetings: 1h 45min
Focus time: 4 hours
```
```

**File 4:** `.claude/skills/file-organizer.md` (optional - show briefly)

```markdown
# File Organizer Skill

## Purpose
Organize downloads and files into PARA system

## MCP Servers Used
- filesystem-mcp (~/Downloads, PARA folders)

## Instructions
1. Scan ~/Downloads for files
2. Categorize each:
   - Work projects → 1.Projects/Work
   - Personal → 2.Sid/Personal
   - Templates/resources → 3.Resources
   - Old files → 4.Archive
3. Apply naming convention: YYYY-MM-DD-filename
4. Move files to appropriate folders
5. Report what was organized

## Example Output
```
File Organization Complete:

MOVED:
- project-proposal.pdf → 1.Projects/Work/
- personal-taxes.xlsx → 2.Sid/Personal/
- design-template.fig → 3.Resources/Templates/
- old-report-2023.pdf → 4.Archive/

Total: 24 files organized
Downloads folder: Clean
```
```

---

### MCP Config File (Show in video)

**File:** `~/.config/claude/mcp-config.json`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/sid/1.Projects",
        "/Users/sid/2.Sid",
        "/Users/sid/3.Resources",
        "/Users/sid/4.Archive",
        "/Users/sid/Downloads"
      ]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-chrome-devtools"
      ]
    },
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_TOKEN": "your-token-here"
      }
    }
  }
}
```

---

## 🎯 CRITICAL ASSETS (Must-Have for Script to Work)

**Without these, the video doesn't work:**

1. **Working Claude Code installation** ✅ (you have this)
2. **MCP servers actually installed and configured** ✅ (you can do this)
3. **Agent file created** (placeholder is fine - doesn't need to actually execute)
4. **Skill files created** (placeholders fine - visual demo only)
5. **Morning routine demo footage** - This MUST look real:
   - Show the command being typed
   - Show plausible output (can be pre-written and cat'd to terminal if needed)
   - Your genuine reaction

**Assets you can fake/simulate (if needed):**
- Email summaries (create realistic terminal output, display it)
- Slack summaries (same - pre-write the output format)
- Calendar briefing (realistic example output)

**Assets you CANNOT fake:**
- App installation via Homebrew (must be real - but you can speed up)
- MCP installation (must show real npm installs)
- Claude Code authentication (must be real)
- File/folder creation (must be real Finder footage)

---

## 📋 PRE-FLIGHT CHECKLIST (Day Before Filming)

### Technical
- [ ] Claude Code working (test: `claude --version`)
- [ ] MCP servers installed (test each one)
- [ ] Homebrew updated (`brew update`)
- [ ] Screen recording software tested (CleanShot X)
- [ ] External mic connected and tested
- [ ] Camera/phone charged (if filming with phone)
- [ ] Test automation sequence once (verify it works)

### Content
- [ ] Agent file created (`.claude/agents/mac-master-agent.md`)
- [ ] 3-4 skill files created (even if placeholders)
- [ ] MCP config file visible (for screen recording)
- [ ] GitHub Gist created with prompts (ready to link)
- [ ] Script reviewed (comfortable with delivery)

### Workspace
- [ ] Desk cleaned (visible in shots)
- [ ] Desktop cleaned (no personal files visible in screen recordings)
- [ ] Browser bookmarks cleaned (if showing browser)
- [ ] Menu bar apps relevant only (hide unnecessary)
- [ ] Lighting tested (face visible, no harsh shadows)
- [ ] Background cleaned (not cluttered/distracting)

### Props
- [ ] Coffee cup (morning routine prop)
- [ ] New/clean MacBook (or appear new)
- [ ] External monitor (if you use one - shows in B-roll)

---

## ⏱️ FILMING DAY SCHEDULE (Recommended)

**Session 1: Talking Head (2-3 hours)**
- Film all talking-to-camera sections
- Multiple takes per section
- Consistent lighting throughout
- Don't film screen recordings yet (different session)

**Break (30 min)**

**Session 2: Screen Recordings (2-3 hours)**
- Record all terminal work
- Record app installation
- Record file organization
- Clean takes (can do multiple attempts)

**Break**

**Session 3: B-Roll (1-2 hours)**
- Coffee making (cinematic)
- App demos (quick feature highlights)
- File organization shots
- Workspace establishing shots

**Total filming:** 6-8 hours (can split across 2 days if needed)

---

## 🎞️ EDITING CHECKLIST (By Section)

### Section-by-Section Assets

**[0:00-2:00] Hook + Intro:**
- ✓ Talking head (hook delivery)
- ✓ Montage (apps/files/summaries - 3-5 clips, 3 sec each)
- ✓ Text overlay: "AI AGENTS RUN MY MAC"
- ✓ Music starts 0:30

**[2:00-4:00] Install Claude Code:**
- ✓ Talking head (brief explanation)
- ✓ Terminal recording (commands + execution)
- ✓ Command text overlays
- ✓ Success checkmark graphic

**[4:00-8:00] Install MCP Servers:**
- ✓ Talking head (explain MCP)
- ✓ MCP architecture diagram (animated)
- ✓ Terminal: Each MCP installing
- ✓ Config file editing
- ✓ Checklist: 5 MCPs installed

**[8:00-10:00] Install Apps:**
- ✓ Terminal: Homebrew installation
- ✓ Applications folder filling up
- ✓ Progress counter text
- ✓ Quick app launches (B-roll)

**[10:00-12:00] PARA System:**
- ✓ PARA diagram (quick explanation)
- ✓ Terminal: Folder creation
- ✓ Finder: Organized structure
- ✓ Folder tree graphic

**[12:00-18:00] Build Agent:**
- ✓ Agent architecture diagram
- ✓ Screen recording: Creating agent file
- ✓ Screen recording: Creating skill files
- ✓ Code snippets readable (zoomed appropriately)
- ✓ File structure visualization

**[18:00-21:00] Morning Routine Demo:** ⭐
- ✓ Coffee B-roll (cinematic)
- ✓ Terminal: "morning briefing" command
- ✓ Email/Slack/Calendar summaries generating
- ✓ Formatted summary overlays
- ✓ Time comparison: 30 min vs 3 min graphic
- ✓ Your satisfied reaction

**[21:00-22:00] Vision:**
- ✓ Talking head (philosophical)
- ✓ Subtle background: Systems working (ambient)
- ✓ Text: "AI AS OPERATING LAYER"

**[22:00-24:00] How to Build:**
- ✓ GitHub repo screenshot
- ✓ Steps overlay (numbered list)
- ✓ Config file examples

**[24:00-25:00] CTA:**
- ✓ Talking head (friendly close)
- ✓ Subscribe animation
- ✓ End screen elements

---

## 🎨 GRAPHIC DESIGN SPECS

**If creating in Canva/Figma:**

**Brand Colors (Mac aesthetic):**
- Background: #1E1E1E (dark) or #F5F5F7 (light Mac gray)
- Accent: #007AFF (Apple blue) or #5E5CE6 (purple - AI theme)
- Text: #FFFFFF (white) or #1D1D1F (dark)
- Success: #34C759 (green checkmarks)
- Warning: #FF9500 (orange)

**Typography:**
- Headers: SF Pro Display (Mac system font) or Inter (web-safe)
- Body: SF Pro Text or Roboto
- Code: SF Mono or Fira Code (monospace)

**Diagram Style:**
- Clean lines, no clutter
- Mac minimalist aesthetic
- Use icons (not just text boxes)
- Consistent spacing

---

## 📤 UPLOAD ASSETS

### YouTube Upload Requirements

**Video File:**
- [ ] Final export (MP4, H.264)
- [ ] Resolution: 1080p minimum (4K if you filmed it)
- [ ] Under 128GB file size

**Thumbnail:**
- [ ] 1280x720 JPG/PNG
- [ ] Under 2MB
- [ ] Text readable at small sizes

**Description:**
- [ ] First 150 chars have keywords (visible before "show more")
- [ ] Timestamps included
- [ ] Links: GitHub Gist, MCP guide, agent repo
- [ ] 3-5 hashtags at bottom

**End Screen:**
- [ ] Subscribe element (center)
- [ ] Related video (your choice - or create "Part 2" placeholder)
- [ ] Channel icon (right)

---

## 🚀 OPTIONAL ENHANCEMENTS (Nice-to-Have)

### If You Have Extra Time:

**1. Animated diagrams:**
- Use After Effects or Motion for MCP/agent diagrams
- Smooth transitions (components connecting)
- Adds polish

**2. Custom intro (5-10 seconds):**
- Branded opening with your channel name
- Music sting
- Consistent across all videos

**3. Captions/subtitles:**
- Manual transcript (better than auto-generated)
- Helps SEO
- Accessibility

**4. Multiple thumbnail variants:**
- A/B test different designs
- YouTube allows thumbnail changes

**5. Teaser clips:**
- Extract 15-30 sec highlights
- Post as YouTube Shorts
- "Full video 👇" drives traffic

---

## 📊 SUCCESS METRICS TO TRACK

**After publishing, monitor:**

**First 48 Hours:**
- Views (target: 500-2000 for new channel)
- CTR (click-through rate from impressions: target 4-8%)
- Retention at 0:30 (target: 50%+ still watching)
- Retention at end (target: 35-45%)

**First Week:**
- Comments (engagement indicator)
- Likes/dislikes ratio
- Shares (especially to tech communities)
- Traffic sources (search, suggested, external)

**Optimization:**
- If CTR low (<4%): Test new thumbnail
- If retention drops early: Re-edit hook
- If retention drops at specific point: Add pattern interrupt there

---

## 🎬 QUICK START: Minimum Viable Assets

**If you want to film FAST, here's the bare minimum:**

**Must-Have:**
1. Talking head: Hook, intro, close (10 min filming)
2. Terminal: MCP installs, agent demo, morning briefing (15 min recording)
3. Text overlays: Commands, sections (2 hours creating)
4. Music: 1 background track
5. Thumbnail: Option 1 (agent architecture)

**Can skip:**
- Extensive B-roll (use screen recordings only)
- Animated diagrams (use simple static graphics)
- Multiple takes (one good take per section)

**Minimal editing:** 6-8 hours

---

**📄 Checklist saved to:** `/outputs/10-28-2025/youtube-mac-setup-research/PRODUCTION-ASSETS-CHECKLIST.md`

**You now have:**
✅ Final script (25 min, correct flow)
✅ Complete asset checklist
✅ Placeholder agent + skill files (ready to create)
✅ YouTube best practices applied (retention tactics, 50-60% rule)
✅ Production timeline (4-6 days estimate)

**Ready to film?** Or need help with anything else?