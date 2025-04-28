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
    stub: "page.trashed.stub",
    target: `pages/${plurarModuleName}TrashedPage.tsx`,
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
    "../src/modules/Base/helpers/translations.ts"
  );

  if (!fs.existsSync(translationFilePath)) {
    console.error("❌ translations.ts not found at:", translationFilePath);
    return;
  }

  let content = fs.readFileSync(translationFilePath, "utf8");

  const importMarkerStart = "// [IMPORT MODULE CONFIGS]";
  const importMarkerEnd = "// [END IMPORT MODULE CONFIGS]";
  const translationMarkerStart = "// [TRANSLATION ENTRIES]";
  const translationMarkerEnd = "// [END TRANSLATION ENTRIES]";

  const importLine = `import ${camelModuleName}ModuleConfig from "@/modules/${moduleName}/module.config";\r\n`;
  const translationEntry = `    [${camelModuleName}ModuleConfig.name]: (await import(\`../../${moduleName}/messages/\${locale}.json\`)).default,\r\n`;

  // بررسی و افزودن import
  if (!content.includes(importLine)) {
    const importEndIndex = content.indexOf(importMarkerEnd);
    if (importEndIndex === -1) {
      console.error("❌ Import marker not found in translations.ts");
      return;
    }
    // افزودن importLine دقیقاً قبل از importMarkerEnd
    content =
      content.slice(0, importEndIndex) +
      importLine +
      content.slice(importEndIndex);
    console.log(`✅ Added import for ${moduleName}`);
  } else {
    console.log(`⏩ Import for ${moduleName} already exists, skipping.`);
  }

  // بررسی و افزودن translation entry
  if (!content.includes(translationEntry)) {
    const translationEndIndex = content.indexOf(translationMarkerEnd);
    if (translationEndIndex === -1) {
      console.error("❌ Translation marker not found in translations.ts");
      return;
    }
    // افزودن translationEntry دقیقاً قبل از translationMarkerEnd
    content =
      content.slice(0, translationEndIndex) +
      translationEntry +
      content.slice(translationEndIndex);
    console.log(`✅ Added translation entry for ${moduleName}`);
  } else {
    console.log(
      `⏩ Translation entry for ${moduleName} already exists, skipping.`
    );
  }

  fs.writeFileSync(translationFilePath, content, { encoding: "utf8" });
  console.log("✅ translations.ts updated successfully.");
};
addTranslationEntry();

const addRoutesEntry = () => {
  const routesFilePath = path.join(
    __dirname,
    "../src/modules/Base/hooks/use-routes.tsx"
  );

  if (!fs.existsSync(routesFilePath)) {
    console.error("❌ use-routes.tsx not found at:", routesFilePath);
    return;
  }

  let content = fs.readFileSync(routesFilePath, "utf8");

  const importMarkerStart = "// [IMPORT MODULE ROUTES]";
  const importMarkerEnd = "// [END IMPORT MODULE ROUTES]";
  const routesMarkerStart = "// [ROUTES ENTRIES]";
  const routesMarkerEnd = "// [END ROUTES ENTRIES]";

  const importLine = `import ${camelModuleName}Routes from "@/modules/${moduleName}/routes/${kebabModuleName}";\r\n`;
  const routesEntry = `    ...${camelModuleName}Routes(t),\r\n`;

  // بررسی و افزودن import
  if (!content.includes(importLine)) {
    const importEndIndex = content.indexOf(importMarkerEnd);
    if (importEndIndex === -1) {
      console.error("❌ Import marker not found in use-routes.tsx");
      return;
    }
    // افزودن importLine دقیقاً قبل از importMarkerEnd
    content =
      content.slice(0, importEndIndex) +
      importLine +
      content.slice(importEndIndex);
    console.log(`✅ Added import for ${moduleName} routes`);
  } else {
    console.log(`⏩ Import for ${moduleName} routes already exists, skipping.`);
  }

  // بررسی و افزودن routes entry
  if (!content.includes(routesEntry)) {
    const routesEndIndex = content.indexOf(routesMarkerEnd);
    if (routesEndIndex === -1) {
      console.error("❌ Routes marker not found in use-routes.tsx");
      return;
    }
    // افزودن routesEntry دقیقاً قبل از routesMarkerEnd
    content =
      content.slice(0, routesEndIndex) +
      routesEntry +
      content.slice(routesEndIndex);
    console.log(`✅ Added routes entry for ${moduleName}`);
  } else {
    console.log(`⏩ Routes entry for ${moduleName} already exists, skipping.`);
  }

  fs.writeFileSync(routesFilePath, content, { encoding: "utf8" });
  console.log("✅ use-routes.tsx updated successfully.");
};
addRoutesEntry();

const addEnumSourceEntry = () => {
  const enumsFilePath = path.join(
    __dirname,
    "../src/modules/Base/helpers/local-storage-artisan.ts"
  );

  if (!fs.existsSync(enumsFilePath)) {
    console.error("❌ local-storage-artisan.ts not found at:", enumsFilePath);
    return;
  }

  let content = fs.readFileSync(enumsFilePath, "utf8");

  const enumsMarkerStart = "// [ENUM ENTRIES]";
  const enumsMarkerEnd = "// [END ENUM ENTRIES]";

  const enumEntry = `  ${upperSnakeModuleName} = "${snakeModuleName}",\r\n`;

  // بررسی و افزودن enum entry
  if (!content.includes(enumEntry)) {
    const enumEndIndex = content.indexOf(enumsMarkerEnd);
    if (enumEndIndex === -1) {
      console.error("❌ Enum marker not found in local-storage-artisan.ts");
      return;
    }
    // افزودن enumEntry دقیقاً قبل از enumsMarkerEnd
    content =
      content.slice(0, enumEndIndex) + enumEntry + content.slice(enumEndIndex);
    console.log(`✅ Added enum entry for ${moduleName}`);
  } else {
    console.log(`⏩ Enum entry for ${moduleName} already exists, skipping.`);
  }

  fs.writeFileSync(enumsFilePath, content, { encoding: "utf8" });
  console.log("✅ local-storage-artisan.ts updated successfully.");
};
addEnumSourceEntry();
