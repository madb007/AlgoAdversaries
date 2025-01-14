import Topbar from "../../../components/Topbar";
import Workspace from "../../../components/Workspace/Workspace";
import { problems } from "../../utils/problems";
import { Problem } from "../../utils/types/problemStructure";
import { notFound } from "next/navigation";

export default function ProblemPage({ params }: { params: { pid: string } }) {
  
  const problem = problems[params.pid];

  if (!problem) {
    notFound();
  }

  const serializedProblem: Problem = {
    ...problem,
    handlerFunction: problem.handlerFunction.toString(),
  };

  return (
    <div>
      <Topbar problemPage />
      <Workspace problem={serializedProblem} />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(problems).map((key) => ({
    pid: key,
  }));
}