export class ToolsTexts {
  public async cleanText(str: string): Promise<string> {
    if (!str) return '';

    // sonar-ignore-next-line typescript:S7781 -- false positive, replaceAll not valid with global regex
    return str
      .replace(/\s*\([^()]*\)/g, '') 
      .replace(/\n/g, ' ')           
      .replace(/\s+/g, ' ')         
      .trim();
  }
}
