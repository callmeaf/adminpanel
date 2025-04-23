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

const addTranslationEntry = () => {
  const translationFilePath = path.join(
    __dirname,
    "../src/modules/Base/heleprs/translations.ts"
  );
  const content = fs.readFileSync(translationFilePath, "utf8");

  const importMarkerStart = "// [IMPORT MODULE CONFIGS]";
  const importMarkerEnd = "// [END IMPORT MODULE CONFIGS]";
  const translationMarkerStart = "// [TRANSLATION ENTRIES]";
  const translationMarkerEnd = "// [END TRANSLATION ENTRIES]";

  const importLine = `import ${camelModuleName}ModuleConfig from "@/modules/${moduleName}/module.config";`;
  const translationEntry = `    [${camelModuleName}ModuleConfig.name]: (await import(\`../../${moduleName}/messages/\${locale}.json\`)).default,`;

  const updated = content
    .replace(
      new RegExp(`${importMarkerStart}([\\s\\S]*?)${importMarkerEnd}`),
      (match, p1) => {
        return `${importMarkerStart}\n${p1.trim()}\n${importLine}\n${importMarkerEnd}`;
      }
    )
    .replace(
      new RegExp(
        `${translationMarkerStart}([\\s\\S]*?)${translationMarkerEnd}`
      ),
      (match, p1) => {
        return `${translationMarkerStart}\n${p1.trim()}\n${translationEntry}\n${translationMarkerEnd}`;
      }
    );

  fs.writeFileSync(translationFilePath, updated);
  console.log("✅ translations.ts updated using markers.");
};
addTranslationEntry();

const addRoutesEntry = () => {
  const routesFilePath = path.join(
    __dirname,
    "../src/modules/Base/hooks/use-routes.tsx"
  );
  const content = fs.readFileSync(routesFilePath, "utf8");

  const importMarkerStart = "// [IMPORT MODULE ROUTES]";
  const importMarkerEnd = "// [END IMPORT MODULE ROUTES]";
  const routesMarkerStart = "// [ROUTES ENTRIES]";
  const routesMarkerEnd = "// [END ROUTES ENTRIES]";

  const importLine = `import ${camelModuleName}Routes from "@/modules/${moduleName}/${kebabModuleName}";`;
  const routesEntry = `   ...${camelModuleName}Routes(t)`;

  const updated = content
    .replace(
      new RegExp(`${importMarkerStart}([\\s\\S]*?)${importMarkerEnd}`),
      (match, p1) => {
        return `${importMarkerStart}\n${p1.trim()}\n${importLine}\n${importMarkerEnd}`;
      }
    )
    .replace(
      new RegExp(`${routesMarkerStart}([\\s\\S]*?)${routesMarkerEnd}`),
      (match, p1) => {
        return `${routesMarkerStart}\n${p1.trim()}\n${routesEntry}\n${routesMarkerEnd}`;
      }
    );

  fs.writeFileSync(routesFilePath, updated);
  console.log("✅ use-routes.ts updated using markers.");
};
addRoutesEntry();

const addEnumSourceEntry = () => {
  const enumsFilePath = path.join(
    __dirname,
    "../src/modules/Base/helpers/local-storage-artisan.ts"
  );
  const content = fs.readFileSync(enumsFilePath, "utf8");

  const enumsMarkerStart = "// [ENUM ENTRIES]";
  const enumsMarkerEnd = "// [END ENUM ENTRIES]";

  const routesEntry = `  ${upperSnakeModuleName} = "${snakeModuleName}",`;

  const updated = content.replace(
    new RegExp(`${enumsMarkerStart}([\\s\\S]*?)${enumsMarkerEnd}`),
    (match, p1) => {
      return `${enumsMarkerStart}\n${p1.trim()}\n${routesEntry}\n${enumsMarkerEnd}`;
    }
  );

  fs.writeFileSync(enumsFilePath, updated);
  console.log("✅ use-routes.ts updated using markers.");
};
addEnumSourceEntry();
