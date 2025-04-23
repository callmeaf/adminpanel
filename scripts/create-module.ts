import fs from "fs";
import path from "path";
import Pluralize from "pluralize";
import * as changeCase from "change-case";

const args = process.argv.slice(2);
const moduleName = args[0];

if (!moduleName) {
  console.error("❌ Please enter module name");
  process.exit(1);
}
const lowerModuleName = moduleName.toLowerCase();
const plurarModuleName = Pluralize.plural(moduleName);
const camelModuleName = changeCase.camelCase(moduleName);
const plurarCamelModuleName = Pluralize.plural(camelModuleName);
const snakeModuleName = changeCase.snakeCase(moduleName);
const upperSnakeModuleName = snakeModuleName.toUpperCase();
const plurarSnakeModuleName = Pluralize.plural(snakeModuleName);
const kebabModuleName = changeCase.kebabCase(moduleName);

// مسیر پوشه ماژول‌ها که داخل src هست
const baseModuleDir = path.join(__dirname, "../src/modules", moduleName);
const stubDir = path.join(__dirname, "../stubs");

// فایل‌هایی که باید بسازه و مسیرشون
const files = [
  {
    stub: "module.config.stub",
    target: "module.config.ts",
  },
  {
    stub: "route.stub",
    target: `routes/${kebabModuleName}.tsx`,
  },
  {
    stub: "page.index.stub",
    target: `pages/${plurarModuleName}Page.tsx`,
  },
  {
    stub: "page.create.stub",
    target: `pages/${plurarModuleName}CreatePage.tsx`,
  },
  {
    stub: "page.edit.stub",
    target: `pages/${plurarModuleName}EditPage.tsx`,
  },
  {
    stub: "page.import.excel.stub",
    target: `pages/${plurarModuleName}ImportExcelPage.tsx`,
  },
  {
    stub: "wrapper.stub",
    target: `widgets/${plurarModuleName}Wrapper.tsx`,
  },
  {
    stub: "table.stub",
    target: `widgets/${plurarModuleName}Table.tsx`,
  },
  {
    stub: "table.filter.stub",
    target: `widgets/${plurarModuleName}TableFilter.tsx`,
  },
  {
    stub: "form.stub",
    target: `widgets/${moduleName}Forms.tsx`,
  },
  {
    stub: "form.info.stub",
    target: `widgets/${moduleName}InfoForm.tsx`,
  },
  {
    stub: "import.stub",
    target: `widgets/${plurarModuleName}Import.tsx`,
  },
  {
    stub: "request.stub",
    target: `requests/${kebabModuleName}-requests.tsx`,
  },
  {
    stub: "request.interface.stub",
    target: `interfaces/request-interface.ts`,
  },
  {
    stub: "model.stub",
    target: `models/${moduleName}.ts`,
  },
  {
    stub: "messages.fa.stub",
    target: `messages/fa.json`,
  },
];

// تبدیل محتوای stub به متن نهایی
function renderStub(content: string, page: string = ""): string {
  return content
    .replace(/{{moduleName}}/g, moduleName)
    .replace(/{{lowerModuleName}}/g, lowerModuleName)
    .replace(/{{plurarModuleName}}/g, plurarModuleName)
    .replace(/{{plurarCamelModuleName}}/g, plurarCamelModuleName)
    .replace(/{{plurarSnakeModuleName}}/g, plurarSnakeModuleName)
    .replace(/{{upperSnakeModuleName}}/g, upperSnakeModuleName)
    .replace(/{{snakeModuleName}}/g, snakeModuleName)
    .replace(/{{camelModuleName}}/g, camelModuleName)
    .replace(/{{kebabModuleName}}/g, kebabModuleName)
    .replace(/{{page}}/g, page);
}

// اطمینان از اینکه پوشه‌ها وجود دارن
function ensureDirExists(dirPath: string): boolean {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    return true;
  }
  return false;
}

function ensureTargetPathDoesNotExists(targetPath: string): boolean {
  if (fs.existsSync(targetPath)) {
    console.log(`⏩ File already exists, skipping: ${targetPath}`);
    return false;
  }
  return true;
}

// ساختن فایل‌ها
files.forEach(({ stub, target }) => {
  const stubPath = path.join(stubDir, stub);
  const targetPath = path.join(baseModuleDir, target);

  ensureDirExists(path.dirname(targetPath));

  if (ensureTargetPathDoesNotExists(targetPath)) {
    const stubContent = fs.readFileSync(stubPath, "utf8");
    const finalContent = renderStub(stubContent);

    fs.writeFileSync(targetPath, finalContent);
    console.log("✅ Successfully created", targetPath);
  }
});

const rootPagesDir = path.join(
  __dirname,
  "../src/app/[locale]",
  plurarSnakeModuleName
);
const rootPages = [
  {
    stub: "page.root.stub",
    target: "page.tsx",
    page: `${plurarModuleName}Page`,
  },
  {
    stub: "page.root.stub",
    target: "create/page.tsx",
    page: `${plurarModuleName}CreatePage`,
  },
  {
    stub: "page.root.stub",
    target: "trashed/page.tsx",
    page: `${plurarModuleName}TrashedPage`,
  },
  {
    stub: "page.root.stub",
    target: `[${camelModuleName}Id]/edit/page.tsx`,
    page: `${plurarModuleName}EditPage`,
  },
];

rootPages.forEach(({ stub, target, page }) => {
  const stubPath = path.join(stubDir, stub);
  const targetPath = path.join(rootPagesDir, target);

  ensureDirExists(path.dirname(targetPath));

  if (ensureTargetPathDoesNotExists(targetPath)) {
    const stubContent = fs.readFileSync(stubPath, "utf8");
    const finalContent = renderStub(stubContent, page);

    fs.writeFileSync(targetPath, finalContent);
    console.log("✅ Successfully created", targetPath);
  }
});
