# YouTube Script: How AI Agents Run My Mac (Apps, Files, Morning Routine - Everything)

**Generated:** October 28, 2025 (FINAL - Correct Architecture)
**Platform:** YouTube
**Duration:** 25 minutes (1500 seconds)
**Concept:** One master AI agent with modular skills + MCP servers = agentic Mac operating layer
**Voice:** Builder-philosopher (lowercase hook) → Technical teacher → Visionary close

---

## Video Metadata

**Title:** How AI Agents Run My Mac (Apps, Files, Morning Routine - Everything)

**Alternative Titles (Test These):**
- "I Built an AI Agent to Run My Mac (Here's How It Works)"
- "My Mac Has an AI Agent Now (Setup, Organization, Daily Tasks)"
- "ai agents stopped being software. they became my operating system"

**Description:**
i let an AI agent run my mac for 30 days.

not chatgpt. not copilot. actual agentic AI with skills and MCP servers.

it installed all my apps. organized my files into PARA system. handles my morning routine - email summaries, slack catchup, calendar briefings.

this video shows you how to build it:
✅ Claude Code installation + authentication
✅ MCP servers (filesystem, chrome, github, slack)
✅ Creating the master agent with skills
✅ Morning routine automation that actually saves time

this works today. on your mac. right now.

🔗 RESOURCES:
• GitHub repo with agent + skills: [LINK]
• MCP server installation guide: [LINK]
• All prompts and configs: [LINK]

⏱️ TIMESTAMPS:
0:00 - ai agents running my mac
2:00 - installing claude code
4:00 - installing mcp servers (foundation layer)
8:00 - app installation (automated)
10:00 - PARA file organization
12:00 - building the agent architecture
18:00 - morning routine demo (agents working)
22:00 - how to build this yourself
24:00 - what's next

#ClaudeCode #AIAgents #MCPServers #AgenticAI #MacAutomation

---

## Full Script with Timing

### [0:00-0:05] HOOK (5 seconds)

**SCRIPT:**
"ai agents installed my apps, organized my files, and handle my morning routine. this is what agentic AI actually looks like."

**[VISUAL DIRECTION]:**
- Shot: You at desk, direct to camera
- Style: Casual, confident, matter-of-fact
- Background: Mac setup visible, clean workspace

**[ON-SCREEN TEXT]:**
- "AI AGENTS RUN MY MAC" (appears 1 sec in)
- Lowercase aesthetic (matches your voice)

**[AUDIO]:**
- No music yet (clean hook)
- Lowercase delivery style (conversational, not formal)

**[NOTE ON VOICE]:**
Using lowercase builder-philosopher mode for hook - this matches your authentic Twitter voice for this type of content

---

### [0:05-2:00] INTRO - The Vision (115 seconds)

**SCRIPT:**
"here's what that means.

most people think AI is chatgpt in a browser. you ask questions, it writes code, maybe helps with your work.

this is different.

i built an AI agent that runs my mac. not just responds to prompts. actually takes action.

when i got this new mac, the agent:
- installed every app via homebrew. no clicking through installers.
- created my para file system - projects, areas, resources, archives - and started organizing files.
- set up mcp servers that let it control my browser, manage github, access my email.
- built a morning routine. i wake up, the agent has already summarized my emails, caught me up on slack, and briefed me on my calendar.

30 minutes of manual work became 5 minutes of AI automation.

and you can build this. today. on your mac.

this video shows you the architecture:
- how to install claude code and mcp servers
- how to create the master agent with modular skills
- how morning routine automation actually works
- the prompts and configs you can copy

this isn't theoretical. i've been running this for 30 days. it works.

let me show you how to build it."

**[VISUAL DIRECTION]:**
- 0:05-0:45: You talking, setting up contrast (ChatGPT vs agents)
- 0:45-1:15: Quick montage:
  - Apps installing automatically (terminal footage)
  - Files organizing into PARA folders
  - Email/Slack summaries generating
  - Calendar briefing appearing
- 1:15-1:45: Back to you, building anticipation
- 1:45-2:00: Screen showing what's coming (chapter preview)

**[ON-SCREEN TEXT]:**
- 0:25: "chatgpt = reactive" (crosses out) → "agents = proactive"
- 1:00: Benefits list appears:
  - "✓ apps installed"
  - "✓ files organized"
  - "✓ morning briefings"
  - "✓ everything automated"
- 1:50: "you can build this today"

**[MUSIC]:**
- Starts at 0:30 (builds anticipation)
- Tech-focused, moderate tempo
- Volume: 20%

---

### [2:00-4:00] INSTALLING CLAUDE CODE (2 minutes)

**SCRIPT:**
"first, get claude code running.

you need node.js:

```bash
# install homebrew (if you don't have it)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# install node
brew install node
```

then install claude code:

```bash
npm install -g @anthropic-ai/claude-code
```

authenticate:

```bash
claude
```

browser opens, sign in with anthropic account. free tier works for testing.

you're in. now we build the foundation."

**[VISUAL DIRECTION]:**
- 2:00-2:20: You explaining briefly
- 2:20-4:00: Terminal full-screen
  - Each command shown
  - Real execution
  - Authentication flow (browser in PIP)

**[ON-SCREEN TEXT]:**
- 2:30: Commands overlay (large monospace)
- 3:45: "✓ CLAUDE CODE READY"

---

### [4:00-8:00] INSTALLING MCP SERVERS - The Foundation (4 minutes)

**SCRIPT:**
"okay, before we install apps or build agents, we need the foundation layer: mcp servers.

mcp - model context protocol - these are plugins that extend what AI can do.

by default, claude code can read files and run terminal commands. that's it.

with mcp servers, it can control your browser, manage github repos, organize your filesystem, access your email.

these are the ones i install:

**filesystem mcp:**
```bash
npm install -g @modelcontextprotocol/server-filesystem
```

this lets claude code organize files, create directories, move stuff around. you'll see this with para setup.

**chrome devtools mcp:**
```bash
npm install -g @modelcontextprotocol/server-chrome-devtools
```

claude code can now control chrome. navigate websites, click buttons, take screenshots, monitor network requests.

**github mcp:**
```bash
npm install -g @modelcontextprotocol/server-github
```

manage repos, create issues, review prs, all from claude code.

**gmail mcp** (placeholder - you can build custom):
```bash
# custom gmail mcp server
npm install -g @custom/gmail-mcp
```

read inbox, categorize emails, flag urgent messages.

**slack mcp** (placeholder - custom):
```bash
npm install -g @custom/slack-mcp
```

read channels, summarize mentions, track important conversations.

now here's the important part: you configure which directories and permissions each mcp has.

filesystem mcp? i give it access to my home directory, but not system folders.

chrome mcp? specific websites only.

you control the boundaries. AI doesn't get carte blanche access to everything.

configuration goes in:
```
~/.config/claude/mcp-config.json
```

each mcp server listed with permissions. i'll link my config file - you can copy it.

mcp servers installed. now claude code can do real work."

**[VISUAL DIRECTION]:**
- 4:00-4:45: You explaining what MCP is (use simple diagram)
- 4:45-6:30: Terminal showing each MCP installation
  - Filesystem
  - Chrome DevTools
  - GitHub
  - Gmail (custom)
  - Slack (custom)
- 6:30-7:30: Config file being edited (show permissions structure)
- 7:30-8:00: Success confirmation (all MCPs loaded)

**[ON-SCREEN TEXT]:**
- 4:15: "MCP = MODEL CONTEXT PROTOCOL"
- 4:25: "PLUGINS FOR YOUR AI"
- 5:00: MCP server list appears as each installs:
  - ✓ Filesystem
  - ✓ Chrome DevTools
  - ✓ GitHub
  - ✓ Gmail (custom)
  - ✓ Slack (custom)

**[GRAPHICS]:**
- Diagram showing: Claude Code (center) → MCP Servers (surrounding) → Your Systems (outer ring)
- Animation: Each MCP connecting as it's installed

**[B-ROLL]:**
- Config file JSON structure
- MCP server npm pages
- Permission boundaries visualization

---

### [8:00-10:00] APP INSTALLATION - Using the MCPs (2 minutes)

**SCRIPT:**
"mcp servers are installed. now installing apps is trivial.

one prompt to claude code:

```
install these apps via homebrew:
raycast, rectangle, bartender, cleanshot x, stats, arc, notion, slack, notion calendar, iterm2, vs code, docker, 1password

show me the commands first.
```

claude code uses the filesystem mcp to verify directories, homebrew to install, then organizes everything.

watch."

**[PAUSE - show execution]**

"all apps installing. automatically.

this used to take 2 hours of clicking. now it's 6 minutes.

but apps are just tools. the real power is what comes next."

**[VISUAL DIRECTION]:**
- 8:00-8:30: You showing prompt
- 8:30-10:00: Terminal with installation progress (can speed up 2x)
  - Show 3-4 apps installing
  - Applications folder filling up in background

**[ON-SCREEN TEXT]:**
- 8:45: "13 APPS INSTALLING..."
- 9:30: "✓ COMPLETE IN 6 MINUTES"

**[PACING]:**
- Keep this SHORT - apps aren't the story, agents are

---

### [10:00-12:00] PARA SYSTEM CREATION (2 minutes)

**SCRIPT:**
"para - projects, areas, resources, archives. tiago forte's system for organizing your digital life.

here's my structure:
- 1.Projects - active work with deadlines
- 2.Sid - personal stuff, learning, side projects
- 3.Resources - templates, references, materials
- 4.Archive - completed projects

numbered so they auto-sort to the top.

one prompt to claude code:

```
create my para folder structure:
1.Projects (with subfolders: Work, SideProjects)
2.Sid (with subfolders: Learning, Personal)
3.Resources (with subfolders: Templates, References)
4.Archive

use numbered prefixes for automatic sorting.
```

done. folders created. file system organized.

later, the file-organizer skill maintains this. moves files to the right categories based on content type and project status.

foundation is set. now we build the agent."

**[VISUAL DIRECTION]:**
- 10:00-10:30: PARA explanation (brief)
- 10:30-11:00: Prompt + execution
- 11:00-12:00: Finder showing PARA structure created

**[ON-SCREEN TEXT]:**
- 10:10: PARA breakdown appears
- 11:15: Folder tree visualization

**[KEEP IT BRIEF]:**
- PARA is context, not the focus
- Move quickly to agent architecture

---

### [12:00-18:00] BUILDING THE AGENT ARCHITECTURE (6 minutes) ⭐ CORE CONTENT

**SCRIPT:**
"alright, here's where we build the actual agent system.

one master agent. multiple skills. mcp servers providing the capabilities.

let me show you the architecture.

**creating the master agent file:**

i create `.claude/agents/mac-master-agent.md`:

```markdown
# Mac Master Agent

## Role
i manage your mac and daily operations. i have access to your filesystem, browser, github, email, and slack through mcp servers. i can install software, organize files, and provide morning briefings.

## Available Skills

### email-summary
- reads gmail inbox via gmail mcp
- categorizes by urgency (client, team, automated, noise)
- flags action items
- ignores newsletters and notifications

### slack-catchup
- reads all slack workspaces via slack mcp
- summarizes mentions and dms
- identifies urgent threads
- tracks important discussions

### calendar-briefing
- reviews google calendar via calendar mcp
- identifies meetings and prep time needed
- flags scheduling conflicts
- calculates focus time blocks

### file-organizer
- uses filesystem mcp to organize downloads
- moves files to appropriate para folders
- applies naming conventions
- maintains folder structure

### app-installer
- installs software via homebrew
- verifies installations
- handles dependencies
- configures initial settings

## MCP Servers Available
- @modelcontextprotocol/server-filesystem (access: ~/1.Projects, ~/2.Sid, ~/3.Resources, ~/4.Archive, ~/Downloads)
- @modelcontextprotocol/server-chrome-devtools (port 9222)
- @modelcontextprotocol/server-github (token configured)
- @custom/gmail-mcp (readonly inbox access)
- @custom/slack-mcp (readonly workspace access)

## Example Invocations

When user says: "morning briefing"
Execute: email-summary skill + slack-catchup skill + calendar-briefing skill in sequence

When user says: "organize downloads"
Execute: file-organizer skill

When user says: "install [app-name]"
Execute: app-installer skill
```

this is the agent definition. one file that describes its role, its skills, and what it can access.

**creating the skills:**

skills live in `.claude/skills/` directory. each skill is focused on one thing.

here's the email-summary skill (`.claude/skills/email-summary.md`):

```markdown
# Email Summary Skill

## Purpose
read gmail inbox and provide actionable summary

## MCP Servers Used
- gmail-mcp (readonly)

## Instructions
1. fetch unread emails from last 12 hours
2. categorize each:
   - client emails (high priority)
   - team emails (medium priority)
   - automated notifications (ignore)
   - newsletters (ignore)
3. for client and team emails:
   - extract sender, subject, key points
   - identify if response needed
   - flag urgency (urgent, today, this week, none)
4. output structured summary:
   - urgent items first
   - action items with deadlines
   - fyi items for awareness
   - total count by category

## Example Output
```
Email Summary (Last 12 Hours):

URGENT (Response Needed Today):
1. Client: API integration question - @john
2. Team: Deployment schedule discussion - @sarah

ACTION ITEMS (This Week):
3. PR review request - @teammate
4. Meeting reschedule - @manager

FYI:
- 12 team updates in #engineering
- 8 github notifications

IGNORED:
- 23 newsletters
- 15 automated notifications

Total: 47 emails, 4 require attention
```
```

slack-catchup skill is similar structure. calendar-briefing skill too.

each skill:
- has one job
- uses specific mcp servers
- outputs structured data
- master agent orchestrates them

this is modular agent design. not one giant prompt. focused skills that compose."

**[VISUAL DIRECTION]:**
- 12:00-13:00: You explaining agent architecture (use diagram)
- 13:00-14:30: Screen recording - creating mac-master-agent.md file
  - Show file structure appearing
  - Scroll through the role, skills, mcp servers sections
- 14:30-16:00: Creating email-summary skill file
  - Show `.claude/skills/` directory
  - Create email-summary.md
  - Show the skill structure
- 16:00-17:00: Brief views of other skills (slack-catchup, calendar-briefing)
- 17:00-18:00: The complete architecture (diagram showing agent + skills + MCPs)

**[ON-SCREEN TEXT]:**
- 12:15: "ONE AGENT + MODULAR SKILLS"
- 13:15: File path: `.claude/agents/mac-master-agent.md`
- 14:45: Skill components appear:
  - Purpose
  - MCP Servers Used
  - Instructions
  - Example Output
- 17:15: Architecture diagram:
  ```
  Mac Master Agent
  ├── email-summary skill
  ├── slack-catchup skill
  ├── calendar-briefing skill
  ├── file-organizer skill
  └── app-installer skill
  ```

**[GRAPHICS NEEDED]:**
- Agent architecture diagram (clean, visual hierarchy)
- File structure tree (.claude/agents/, .claude/skills/)
- Skills → MCP servers connection visualization

**[B-ROLL]:**
- VS Code showing agent file being created
- Skills directory with multiple .md files
- File organization happening

**[PRODUCTION NOTE]:**
- This is the technical core - go slower here
- Show actual file contents (viewers should understand structure)
- Diagrams are critical (visual learners need this)

---

### [18:00-21:00] MORNING ROUTINE DEMO - Agents Working (3 minutes)

**SCRIPT:**
"okay, agent is built. skills are defined. mcp servers are running.

now watch it work.

it's 8am. i just woke up. haven't looked at my computer yet.

i open my mac, launch claude code, and say:

```
morning briefing
```

that's it. two words.

the master agent sees that invocation. it knows to run three skills in sequence: email-summary, slack-catchup, calendar-briefing.

watch what happens."

**[PAUSE - show agent executing]**

"**email-summary skill running:**

'checking gmail... 47 unread emails.

urgent (response needed today):
1. client question about api integration - john
2. deployment schedule - sarah

action items (this week):
3. pr review - teammate
4. meeting reschedule - manager

ignored: 23 newsletters, 15 automated notifications.

4 emails need your attention.'

**slack-catchup skill running:**

'checking slack workspaces...

mentions: 8 total
- #engineering: deployment discussion (3 mentions)
- #product: feature prioritization (2 mentions)
- dm from manager: positive feedback on proposal

no urgent action items. catch up during 10am break.'

**calendar-briefing skill running:**

'today's schedule:

meetings:
- 10am: team standup (15 min)
- 2pm: client demo (1 hour) - prep needed: review slides in drive
- 4pm: 1-on-1 with sarah (30 min)

focus time: 8-10am (now), 12-2pm

conflict detected: client demo overlaps usual lunch. suggest move lunch to 1pm.'

all of that in 3 minutes.

i know exactly what needs attention. what's urgent. what can wait. where my focus time is.

the old way: 30 minutes of reading emails, scrolling slack, checking calendar, getting oriented.

ai agents did it in 3 minutes while i made coffee.

this is agentic AI. proactive. autonomous. actually useful."

**[VISUAL DIRECTION]:**
- 18:00-18:20: You at desk, morning scene (coffee, fresh, calm)
- 18:20-18:40: Terminal - you type "morning briefing"
- 18:40-21:00: Split screen or sequential:
  - Email summary generating (show Gmail interface in background)
  - Slack summary generating (show Slack with unreads)
  - Calendar briefing generating (show Calendar view)
  - Summaries appearing in terminal
- 20:30-21:00: You reading the briefing, satisfied expression

**[ON-SCREEN TEXT]:**
- 18:30: "morning briefing" command (large)
- 18:50: "AGENT ORCHESTRATING SKILLS..."
- 19:00: Email summary appears as overlay (key points highlighted)
- 19:40: Slack summary overlay
- 20:15: Calendar briefing overlay
- 20:45: "3 MINUTES TOTAL"

**[EMOTIONAL PEAK]:**
- This is where viewers see the real value
- Show your genuine reaction (this actually saves time)
- Visceral before/after comparison

**[B-ROLL]:**
- Coffee being made (while AI works)
- Gmail with 47 unread (overwhelming)
- Slack with notification badges
- Calendar packed with meetings
- You calmly reading AI summary (in control)

---

### [21:00-22:00] THE BIGGER PICTURE - Agentic AI (1 minute)

**SCRIPT:**
"this is what agentic AI actually means.

not chatgpt in a browser. not copilot suggesting code.

AI agents that:
- take action autonomously
- orchestrate multiple skills
- use mcp servers to interact with your systems
- give you exactly what you need

we just built an AI layer on top of macos.

the agent manages your mac. you manage the agent.

you're not fighting with your computer anymore. you're collaborating with AI that understands your environment and can change things.

this is where computing is going."

**[VISUAL DIRECTION]:**
- 21:00-22:00: You talking, philosophical mode
- Background: Subtle visualization of the system working (terminal, files organizing, summaries generating - faded, ambient)

**[ON-SCREEN TEXT]:**
- 21:15: "REACTIVE AI" ❌ → "PROACTIVE AGENTS" ✅
- 21:40: "AI AS OPERATING LAYER"

**[MUSIC]:**
- Build to crescendo (inspirational)

---

### [22:00-24:00] HOW TO BUILD THIS (2 minutes)

**SCRIPT:**
"here's how to build this yourself.

**step 1:** install claude code
- node.js via homebrew
- `npm install -g @anthropic-ai/claude-code`
- authenticate

**step 2:** install mcp servers
- filesystem, chrome devtools, github (npm packages)
- custom mcps for gmail/slack (build or find community ones)
- configure permissions in mcp-config.json

**step 3:** create your master agent
- `.claude/agents/mac-master-agent.md`
- define role, available skills, mcp access
- copy my template (github link below)

**step 4:** create skills
- `.claude/skills/` directory
- email-summary, slack-catchup, calendar-briefing, file-organizer
- each skill uses specific mcps
- modular, focused, composable

**step 5:** invoke your agent
- `claude -a mac-master-agent 'morning briefing'`
- agent orchestrates skills
- summaries generate automatically

i've linked everything:
- github repo with agent + all skills (full code)
- mcp server installation guide
- config files (permissions, settings)
- video timestamps for reference

fork it. customize your skills. build your agent system.

this works today."

**[VISUAL DIRECTION]:**
- 22:00-24:00: You talking (teaching mode)
- Quick screen shares showing:
  - GitHub repo structure
  - Agent file
  - Skills directory
  - Config file

**[ON-SCREEN TEXT]:**
- 22:10: Steps appear as numbered list (stays entire section)
- 23:30: "GITHUB REPO 👇"

---

### [24:00-25:00] CTA & WHAT'S NEXT (60 seconds)

**SCRIPT:**
"that's how i built AI agents for my mac.

i'm expanding this:
- content creation agent (researches and writes)
- code review agent (analyzes prs automatically)
- deployment agent (handles releases)

if you want to see those, subscribe.

drop a comment: what would you automate with AI agents? morning routine? email management? something else?

ai agents stopped being software. they became infrastructure.

let's build it."

**[VISUAL DIRECTION]:**
- 24:00-24:40: You talking, forward-looking
- 24:40-25:00: Final shot - your workspace, agents running in background

**[ON-SCREEN TEXT]:**
- 24:15: "SUBSCRIBE FOR MORE AGENT BUILDS"
- 24:45: End screen (subscribe, related video, channel icon)

**[CLOSE WITH YOUR VOICE]:**
- Lowercase philosophical closer: "ai agents stopped being software. they became infrastructure."
- Matches your authentic voice pattern

---

## Revised Production Notes

### What Makes This Script Stronger

**1. Correct Flow:**
- ❌ Old: Apps first, then "oh btw here's MCP"
- ✅ New: MCP foundation first, then everything builds on it

**2. Agent Architecture Is The Story:**
- 6 minutes on building the agent (12:00-18:00)
- Shows actual files, actual structure
- Viewers understand HOW to build modular agents

**3. Morning Routine = Emotional Peak:**
- Real time savings shown (30 min → 3 min)
- Relatable use case (everyone has morning routine)
- Visceral demo (you making coffee while AI works)

**4. Bigger Vision:**
- Not just productivity tips
- It's agentic AI as operating layer
- Shareable concept, discussion-worthy

---

### Revised Thumbnail (Based on New Focus)

**RECOMMENDED Thumbnail:**
- Visual: Mac screen showing agent architecture diagram
  - Center: Mac Master Agent
  - Connected: Email, Slack, Calendar, Files (skills)
  - Bottom: MCP Servers layer
- Your face: Bottom-right, excited expression
- Text: "ONE AI AGENT RUNS MY MAC"
- Subtitle: "(Skills + MCP Servers)"
- Color: Tech blue/purple gradient

---

### Key Filming Notes

**You'll need to create placeholder skill files for demo:**

**`.claude/skills/email-summary.md` (placeholder):**
```markdown
# Email Summary Skill

## Purpose
Reads Gmail and provides actionable summary

## MCP Servers
- gmail-mcp (readonly inbox)

## Instructions
1. Fetch unread emails (last 12 hours)
2. Categorize: client, team, automated, newsletters
3. Flag urgency
4. Output structured summary

## Example Output
[Shows the email summary format from script]
```

**`.claude/skills/slack-catchup.md` (placeholder):**
```markdown
# Slack Catchup Skill

## Purpose
Summarizes Slack activity and flags important items

## MCP Servers
- slack-mcp (readonly workspaces)

## Instructions
1. Check all workspaces for mentions and DMs
2. Categorize by channel and priority
3. Identify urgent threads
4. Output summary with action items

## Example Output
[Shows slack summary format]
```

**`.claude/skills/calendar-briefing.md` (placeholder):**
```markdown
# Calendar Briefing Skill

## Purpose
Reviews calendar and identifies schedule optimization

## MCP Servers
- google-calendar-mcp (readonly)

## Instructions
1. Load today's events
2. Calculate prep time needed
3. Identify conflicts
4. Calculate focus time blocks
5. Output briefing with recommendations

## Example Output
[Shows calendar briefing format]
```

**You can film these being created OR show them pre-created** - either works for the demo.

---

### Questions Still Need Answers:

**1. Do these MCP servers actually exist?**
- Filesystem: ✅ Yes (confirmed)
- Chrome DevTools: ✅ Yes (confirmed)
- GitHub: ✅ Yes (confirmed)
- Gmail: ❓ Custom/community?
- Slack: ❓ Custom/community?
- Calendar: ❓ Custom/community?

**2. Skills feature in Claude Code:**
- Is `.claude/skills/` the actual directory?
- How does agent invoke skills? (`claude -a agent-name --skill email-summary`?)
- Or is "skill" just conceptual organization in your agent file?

**3. Morning briefing command:**
- Actual invocation: `claude -a mac-master-agent "morning briefing"`?
- Or different syntax?

Give me these technical details and I'll finalize with accurate commands instead of placeholders!

---

**📄 FINAL Script Saved:** `/outputs/10-28-2025/youtube-mac-setup-research/YOUTUBE-SCRIPT-FINAL-agentic-mac-25min.md`

**This version tells the right story:** MCP servers → Agent architecture → Skills → Real automation → Agentic AI vision

Way better than the original!