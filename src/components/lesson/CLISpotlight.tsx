import { Terminal } from 'lucide-react';

type CLISpotlightProps = {
  title: string;
  commands: string[];
  explanation: string;
};

export function CLISpotlight({ title, commands, explanation }: CLISpotlightProps) {
  return (
    <div className="cli-spotlight">
      <h3 className="cli-spotlight__title">
        <Terminal size={16} />
        {title}
      </h3>
      <div className="cli-spotlight__code" role="region" aria-label="CLI command block">
        {commands.map((line, index) => {
          const promptMatch = line.match(/^(\S+?[>#])\s*(.*)/);
          if (promptMatch) {
            return (
              <span className="cli-spotlight__code-line" key={index}>
                <span className="prompt">{promptMatch[1]}</span>
                <span className="command">{promptMatch[2]}</span>
              </span>
            );
          }
          return <span className="cli-spotlight__code-line" key={index}>{line}</span>;
        })}
      </div>
      <p className="cli-spotlight__explanation">{explanation}</p>
    </div>
  );
}
