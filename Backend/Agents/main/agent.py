from google.adk.agents.llm_agent import Agent
from .interface.agent import interface_agent
from .fetcher.agent import data_aquisition_agent
from .inspector.agent import inspector_agent
from .clean.agent import clean_agent
from .EDA.agent import EDA_agent
from .feature.agent import feature_agent
from .stat.agent import stat_agent
from .insight.agent import insight_agent
from .reporting.agent import reporting_agent


combined_tools = []
if interface_agent.tools:
    combined_tools.extend(interface_agent.tools)
if data_aquisition_agent.tools:
    combined_tools.extend(data_aquisition_agent.tools)
if inspector_agent.tools:
    combined_tools.extend(inspector_agent.tools)
if clean_agent.tools:
    combined_tools.extend(clean_agent.tools)
if EDA_agent.tools:
    combined_tools.extend(EDA_agent.tools)
if feature_agent.tools:
    combined_tools.extend(feature_agent.tools)
if stat_agent.tools:
    combined_tools.extend(stat_agent.tools)
if insight_agent.tools:
    combined_tools.extend(insight_agent.tools)
if reporting_agent.tools:
    combined_tools.extend(reporting_agent.tools)


root_agent = Agent(
    model='gemini-2.5-flash',
    name='root_agent',
    description = (
        "The central orchestrator agent responsible for managing and coordinating "
        "a multi-agent autonomous data analysis system. Acts as the decision-making "
        "brain that interprets user goals and controls the execution flow across agents."
    ),

    instruction = (
        "You are an AI data analyst. When given a data analysis query, provide a comprehensive "
        "analysis response. Break down your thinking into clear steps and provide actionable insights. "
        "If the query mentions specific data, acknowledge that you would need access to that data. "
        "Provide detailed analysis methodology and expected outcomes."
    ),
)
