# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**RenameFlow** is a batch file renaming web application that allows users to rename large batches of files quickly and accurately using rule-based automation. Built with React, TypeScript, Node.js, and Express.

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Zustand (state management), @dnd-kit (drag & drop)
- **Backend**: Node.js, Express, TypeScript, Multer (file uploads), adm-zip (ZIP generation)
- **Development**: ESLint, Prettier, Git

---

## Project Structure

```
rename-flow/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # Base UI elements (Button, Input, Card)
│   │   │   ├── upload/    # Upload-related components
│   │   │   ├── rules/     # Rule configuration components
│   │   │   └── preview/   # Preview components
│   │   ├── features/      # Feature modules
│   │   │   ├── file-upload/
│   │   │   ├── rule-engine/
│   │   │   └── preview/
│   │   ├── services/      # Business logic services
│   │   │   ├── RenameService.ts
│   │   │   ├── FileService.ts
│   │   │   └── ZipService.ts
│   │   ├── types/         # TypeScript interfaces and types
│   │   ├── store/         # Zustand state management
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Utility functions
│   └── package.json
│
├── server/                # Backend Node.js/Express server
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── services/      # Business logic
│   │   │   ├── FileProcessor.ts
│   │   │   ├── RuleEngine.ts
│   │   │   └── ZipGenerator.ts
│   │   ├── middleware/    # Express middleware
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utilities (validators, sanitizers)
│   │   └── routes/        # API routes
│   └── package.json
│
└── CLAUDE.md              # This file
```

---

## Development Commands

### Frontend (client/)
```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Run Prettier
```

### Backend (server/)
```bash
npm run dev          # Start development server with nodemon
npm run build        # Compile TypeScript
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Run Prettier
```

---

## SOLID Principles Applied

This project follows SOLID principles for maintainability and scalability:

1. **Single Responsibility**: Each service/component has one clear purpose
   - `RenameService`: Handles renaming logic only
   - `FileService`: Handles file validation and management
   - `ZipService`: Handles ZIP generation

2. **Open/Closed**: Rule processors are extensible without modifying existing code
   - Base `RuleProcessor` abstract class
   - Concrete implementations: `CasingRuleProcessor`, `PrefixRuleProcessor`, etc.

3. **Liskov Substitution**: All rule processors can be used interchangeably

4. **Interface Segregation**: Interfaces are specific to their consumers

5. **Dependency Inversion**: High-level modules depend on abstractions, not concrete implementations

---

## Draft 1 (MVP) Scope

### Core Features
- Individual file uploads (drag & drop)
- 4 rule types: Casing, Prefix/Suffix, Sequential Numbering, Find & Replace
- Rule management (add, edit, delete, reorder via drag & drop)
- Live preview (before/after filenames)
- Undo/Reset functionality
- Download renamed files as ZIP
- Error handling (duplicates, invalid characters)
- Responsive UI with Tailwind CSS
- Dark/Light mode toggle
- Accessibility (WCAG AA compliance)

### Future Enhancements (Post-Draft 1)
- ZIP upload with extraction
- Regex support in Find & Replace
- Dynamic variables ({date}, {time}, {counter})
- Templates/History
- Advanced text manipulation
- Cloud integrations

---

## Detailed Phase Breakdown

### **PHASE 1: Project Foundation & Setup** ✅
**Goal**: Set up development environment with proper architecture

**Tasks:**
1. Create monorepo structure (client + server)
2. Initialize Vite + React + TypeScript frontend
3. Configure Tailwind CSS with dark mode support
4. Initialize Express + TypeScript backend
5. Set up ESLint and Prettier
6. Create base folder structure following SOLID principles
7. Configure environment files

**Deliverables:**
- Complete project structure
- Running dev servers (frontend + backend)
- Tailwind CSS configured
- TypeScript compilation working
- ESLint + Prettier configured

---

### **PHASE 2: Core Data Models & State Management**
**Goal**: Define all data structures and state management

**Tasks:**
1. **Type Definitions**
   ```typescript
   // File types
   interface UploadedFile {
     id: string;
     originalName: string;
     newName: string;
     size: number;
     type: string;
     file: File;
   }

   // Rule types
   enum RuleType {
     CASING = 'casing',
     PREFIX = 'prefix',
     SUFFIX = 'suffix',
     NUMBERING = 'numbering',
     FIND_REPLACE = 'findReplace'
   }

   interface BaseRule {
     id: string;
     type: RuleType;
     enabled: boolean;
   }
   ```

2. **State Management**
   - `useFileStore`: File management
   - `useRuleStore`: Rules management
   - `useHistoryStore`: Undo/redo functionality

3. **Service Layer**
   - `RenameService`: Apply renaming logic
   - `FileService`: File validation
   - `ZipService`: ZIP generation

**Deliverables:**
- All TypeScript interfaces/types defined
- Zustand stores configured
- Service layer architecture complete
- Type safety across frontend and backend

---

### **PHASE 3: File Upload System**
**Goal**: Implement drag & drop file upload with validation

**Tasks:**
1. Drag & drop zone with visual feedback
2. File input fallback for accessibility
3. Upload progress indicator
4. File list display with metadata
5. Remove individual files functionality
6. File validation (max 500 files, 100MB total)
7. Backend upload endpoint with multer
8. Temporary storage management

**Deliverables:**
- Working drag & drop upload
- File validation with user feedback
- Backend upload processing
- Accessible upload interface

---

### **PHASE 4: Rule Engine - Foundation**
**Goal**: Build modular rule engine following Open/Closed Principle

**Tasks:**
1. **Abstract Rule Processor**
   ```typescript
   abstract class RuleProcessor {
     abstract apply(filename: string, config: any): string;
     protected sanitize(filename: string): string { }
   }

   class CasingRuleProcessor extends RuleProcessor { }
   class PrefixRuleProcessor extends RuleProcessor { }
   class NumberingRuleProcessor extends RuleProcessor { }
   class FindReplaceRuleProcessor extends RuleProcessor { }
   ```

2. **Rule Factory**
   ```typescript
   class RuleFactory {
     static createProcessor(rule: Rule): RuleProcessor { }
   }
   ```

3. Rule pipeline (sequential processing)
4. Rule UI components

**Deliverables:**
- Modular rule processor architecture
- Rule factory implementation
- Rule pipeline working
- Rule UI components

---

### **PHASE 5: Rule Types Implementation**
**Goal**: Implement all 4 core rule types

**Tasks:**
1. **Casing Rule**
   - snake_case, camelCase, PascalCase, UPPERCASE, lowercase
   - Handle special characters and numbers

2. **Prefix/Suffix Rule**
   - Add prefix before filename
   - Add suffix before extension
   - Input validation

3. **Sequential Numbering**
   - Custom start value
   - Padding options (001, 01, 1)
   - Placement (prefix vs suffix)

4. **Find & Replace**
   - Text search and replace
   - Case-sensitive toggle
   - Replace all vs first occurrence

5. Configuration UI for each rule type

**Deliverables:**
- All 4 rule types working
- Configuration UI for each
- Input validation
- Unit tests for processors

---

### **PHASE 6: Rule Management & Drag-and-Drop**
**Goal**: Implement rule ordering and management

**Tasks:**
1. Drag & drop with @dnd-kit/sortable
2. Visual feedback during drag
3. Update rule order in state
4. Rule actions: edit, delete, enable/disable, duplicate
5. Trigger preview recalculation on changes
6. Keyboard shortcuts
7. Accessibility announcements

**Deliverables:**
- Drag-to-reorder rules working
- Add/edit/delete rules working
- Rule state properly managed
- Accessible rule management

---

### **PHASE 7: Live Preview System**
**Goal**: Real-time preview of renamed files

**Tasks:**
1. Side-by-side Before/After table
2. Highlight changed parts of filenames
3. Apply all rules in order to each file
4. Handle duplicate name conflicts
5. Sanitize invalid characters
6. Performance optimization:
   - Debounce preview calculations
   - Memoize rule processors
   - Virtual scrolling for 100+ files
7. Preview controls (toggle, filter, search)

**Deliverables:**
- Real-time preview working
- Performance optimized
- Preview controls functional
- Handles large file counts

---

### **PHASE 8: Undo/Reset Functionality**
**Goal**: Implement undo/redo and reset features

**Tasks:**
1. History store (track rule changes)
2. Undo/redo stack implementation
3. Maximum history size (50 actions)
4. Update preview on undo/redo
5. Reset all rules functionality
6. Confirmation dialog before reset
7. Keyboard shortcuts (Ctrl+Z, Ctrl+Shift+Z)

**Deliverables:**
- Undo/redo working
- Reset functionality complete
- History properly managed
- Keyboard shortcuts working

---

### **PHASE 9: Download & ZIP Generation**
**Goal**: Process files and generate downloadable ZIP

**Tasks:**
1. Backend `/api/process` endpoint
2. Apply all rules server-side
3. Handle duplicate names (append _1, _2, etc.)
4. Generate ZIP with adm-zip
5. Rename files without modifying content
6. Frontend download button
7. Show processing progress
8. Temp file cleanup

**Deliverables:**
- ZIP generation working
- Download triggered successfully
- Temp file cleanup implemented
- Error handling complete

---

### **PHASE 10: Error Handling & Edge Cases**
**Goal**: Handle all edge cases from PRD

**Tasks:**
1. **Duplicate Filename Handling**
   - Auto-append _1, _2, _3
   - Show warning in preview

2. **Invalid Character Sanitization**
   - Remove /:*?"<>| characters
   - Show sanitization in preview

3. **Empty/Invalid States**
   - Empty upload validation
   - No files selected error
   - Network error handling

4. **Conflict Detection**
   - Warn if Find & Replace deletes full name
   - Prevent processing with errors

5. **Progress & Loading States**
   - Upload progress bar
   - Processing indicator
   - Timeout handling

**Deliverables:**
- All edge cases handled
- Clear error messages
- User-friendly warnings
- Robust error recovery

---

### **PHASE 11: UI/UX Polish & Accessibility**
**Goal**: Create beautiful, accessible interface

**Tasks:**
1. **Landing Page**
   - Hero section with CTA
   - Feature highlights
   - Demo GIF/video
   - Responsive design

2. **Main Interface**
   - Clean dashboard layout
   - Color-coded rule cards
   - Smooth transitions
   - Loading skeletons

3. **Dark/Light Mode**
   - Toggle switch in header
   - Persist in localStorage
   - Proper contrast ratios

4. **Accessibility (WCAG 2.1 AA)**
   - Semantic HTML
   - ARIA labels and roles
   - Keyboard navigation
   - Focus indicators
   - Screen reader support
   - Color contrast compliance

5. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: mobile, tablet, desktop
   - Touch-friendly targets (min 44px)

**Deliverables:**
- Polished UI design
- Dark/light mode working
- WCAG AA compliant
- Fully responsive

---

### **PHASE 12: Testing & Quality Assurance**
**Goal**: Ensure reliability and quality

**Tasks:**
1. **Unit Tests**
   - Test all rule processors
   - Test utility functions
   - Test state management
   - Test file validation

2. **Integration Tests**
   - Test API endpoints
   - Test file upload flow
   - Test ZIP generation
   - Test error scenarios

3. **Manual Testing**
   - Test with various file types
   - Test with large file counts
   - Test edge cases
   - Cross-browser testing
   - Accessibility audit

4. **Performance Testing**
   - Test with 500 files
   - Test with 100MB total size
   - Measure preview calculation time
   - Optimize bottlenecks

**Deliverables:**
- Unit test coverage >80%
- Integration tests passing
- Manual test cases completed
- Performance benchmarks met

---

### **PHASE 13: Documentation & Final Polish**
**Goal**: Complete documentation and prepare for launch

**Tasks:**
1. **Code Documentation**
   - JSDoc comments
   - README for client and server
   - Architecture documentation
   - API documentation

2. **User Documentation**
   - User guide / help section
   - FAQ section
   - Tooltips for UI elements
   - Example use cases

3. **Developer Documentation**
   - Setup instructions
   - Development workflow
   - Build and deployment guide
   - Contributing guidelines

4. **Final Polish**
   - Code cleanup
   - Remove console.logs
   - Optimize bundle size
   - Security audit

**Deliverables:**
- Complete documentation
- Clean, production-ready code
- User guide complete
- Ready for deployment

---

## Timeline Summary

| Phase | Focus Area | Duration | Priority |
|-------|-----------|----------|----------|
| 1 | Project Setup | 1-2 days | Critical |
| 2 | Data Models & State | 1 day | Critical |
| 3 | File Upload | 2-3 days | Critical |
| 4 | Rule Engine Foundation | 2 days | Critical |
| 5 | Rule Types Implementation | 3-4 days | Critical |
| 6 | Rule Management & DnD | 2 days | High |
| 7 | Live Preview | 2-3 days | Critical |
| 8 | Undo/Reset | 1-2 days | High |
| 9 | Download & ZIP | 2 days | Critical |
| 10 | Error Handling | 2 days | High |
| 11 | UI/UX Polish | 3-4 days | High |
| 12 | Testing & QA | 3-4 days | High |
| 13 | Documentation | 1-2 days | Medium |

**Total Estimated Timeline: 3-4 weeks for Draft 1 MVP**

---

## Key Architecture Decisions

### Frontend Architecture
- **State Management**: Zustand for simplicity and performance
- **Styling**: Tailwind CSS for rapid development
- **Drag & Drop**: @dnd-kit for accessibility
- **File Handling**: Client-side processing with Web APIs
- **Routing**: React Router (if multi-page needed)

### Backend Architecture
- **File Uploads**: Multer with file size/count limits
- **Temp Storage**: Session-based, auto-cleanup
- **ZIP Generation**: adm-zip for server-side processing
- **Security**: Helmet, CORS, input sanitization

### Rule Engine Design
- **Extensibility**: Abstract base class for new rule types
- **Modularity**: Each rule is a separate processor
- **Pipeline**: Sequential processing with error handling
- **Validation**: Input validation at each stage

---

## Common Patterns

### Adding a New Rule Type
1. Define type interface in `types/Rule.ts`
2. Create processor class extending `RuleProcessor`
3. Add to `RuleFactory`
4. Create UI component for configuration
5. Add to rule type enum
6. Write unit tests

### State Management Pattern
```typescript
// Define store
const useStore = create<State>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  // ...
}));

// Use in components
const items = useStore((state) => state.items);
const addItem = useStore((state) => state.addItem);
```

### Service Pattern
```typescript
// Single responsibility, pure functions
export class FileService {
  static validateFile(file: File): ValidationResult {
    // Validation logic
  }

  static sanitizeFilename(filename: string): string {
    // Sanitization logic
  }
}
```

---

## Security Considerations

1. **File Upload**: Validate file types, sizes, and count limits
2. **Filename Sanitization**: Remove dangerous characters (/:*?"<>|)
3. **Path Traversal**: Prevent directory traversal attacks
4. **XSS Prevention**: Sanitize user input in Find & Replace
5. **CORS**: Configure properly for API endpoints
6. **Temp Files**: Auto-cleanup to prevent disk filling
7. **Rate Limiting**: Prevent abuse of upload endpoint

---

## Accessibility Guidelines

1. **Keyboard Navigation**: All features accessible via keyboard
2. **Screen Readers**: ARIA labels and live regions
3. **Focus Management**: Visible focus indicators
4. **Color Contrast**: WCAG AA compliance (4.5:1 for text)
5. **Touch Targets**: Minimum 44x44px for mobile
6. **Error Messages**: Clear, descriptive, announced to screen readers
7. **Semantic HTML**: Use proper HTML5 elements

---

## Performance Optimization

1. **Virtual Scrolling**: For large file lists (>100 files)
2. **Debouncing**: Preview calculations debounced by 300ms
3. **Memoization**: React.memo for expensive components
4. **Code Splitting**: Lazy load routes and heavy components
5. **Bundle Optimization**: Tree shaking, minification
6. **Image Optimization**: For landing page assets

---

## Testing Strategy

### Unit Tests
- All rule processors
- Utility functions
- State management
- Validation logic

### Integration Tests
- API endpoints
- File upload flow
- ZIP generation
- Error scenarios

### E2E Tests (Optional)
- Complete user flows
- Cross-browser compatibility

---

## Success Criteria for Draft 1

- [ ] Upload files via drag & drop
- [ ] All 4 rule types functional
- [ ] Rules can be reordered via drag & drop
- [ ] Live preview accurate
- [ ] Undo/Reset works
- [ ] Download renamed files as ZIP
- [ ] Edge cases handled (duplicates, invalid chars)
- [ ] Responsive UI (mobile, tablet, desktop)
- [ ] Accessible (WCAG AA)
- [ ] Dark/light mode
- [ ] No security vulnerabilities
- [ ] Performance: <1s preview for 100 files

---

## Future Roadmap (Post-Draft 1)

### Phase 2 Features
- ZIP upload with extraction
- Regex support in Find & Replace
- Dynamic variables ({date}, {time}, {counter})
- Date metadata extraction (EXIF)

### Phase 3 Features
- Templates/History (save rule sets)
- Cloud integration (Google Drive, Dropbox)
- Rule sharing (export/import)

### Phase 4 Features
- CLI version for developers
- API access for automation
- Batch processing API
- Webhook support

---

## Troubleshooting

### Dev Server Won't Start
- Check Node.js version (requires 18+)
- Delete node_modules and reinstall
- Check for port conflicts

### TypeScript Errors
- Run `npm run build` to see all errors
- Check tsconfig.json configuration
- Ensure types are installed

### Tailwind Not Working
- Check postcss.config.js exists
- Verify @tailwind directives in index.css
- Check content paths in tailwind.config.js

---

## Contact & Resources

- **PRD**: See `prd-rename flow.txt` in project root
- **Repository**: [GitHub link to be added]
- **Documentation**: See README files in client/ and server/
